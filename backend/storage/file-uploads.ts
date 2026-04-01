import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  decodeMetadataValue,
  encodeMetadataValue,
  formatDurationLabelFromSeconds,
} from "@/backend/content/utils";
import type { ApprovalStatus, ContentCategory, MediaItem } from "@/backend/content/types";

const MAX_VIDEO_SIZE_BYTES = 40 * 1024 * 1024;
const MAX_IMAGE_SIZE_BYTES = 6 * 1024 * 1024;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();
const BITSTREAM_TAG = "bitstream-media";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: "image" | "video";
  duration?: number;
  tags?: string[];
  context?: {
    custom?: Record<string, string>;
  };
  created_at?: string;
}

interface UploadedAsset {
  publicId?: string;
  url: string;
}

interface SignedCloudinaryUpload {
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId: string;
  resourceType: "video" | "image";
  signature: string;
  tags: string;
  timestamp: string;
}

function sanitizeFileName(fileName: string) {
  const extension = path.extname(fileName).toLowerCase() || ".bin";
  return `${Date.now()}-${crypto.randomUUID()}${extension.replace(/[^a-z0-9.]/g, "")}`;
}

function assertWithinSizeLimit(file: File, folderName: "videos" | "thumbnails") {
  const maxBytes = folderName === "videos" ? MAX_VIDEO_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;

  if (file.size > maxBytes) {
    throw new Error(
      folderName === "videos"
        ? "Video file is too large. Keep it under 40MB or use a hosted URL."
        : "Thumbnail image is too large. Keep it under 6MB or use a hosted URL.",
    );
  }
}

async function persistFile(file: File, folderName: "videos" | "thumbnails") {
  if (!file || file.size === 0) {
    return { url: "" };
  }

  assertWithinSizeLimit(file, folderName);

  const safeFileName = sanitizeFileName(file.name);
  const uploadDirectory = path.join(process.cwd(), "public", "uploads", folderName);
  const absolutePath = path.join(uploadDirectory, safeFileName);

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return { url: `/uploads/${folderName}/${safeFileName}` };
}

function createCloudinarySignature(params: Record<string, string>) {
  const payload = Object.entries(params)
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${payload}${CLOUDINARY_API_SECRET}`)
    .digest("hex");
}

function getCloudinaryBasicAuthHeader() {
  return `Basic ${Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64")}`;
}

export function cloudinaryUploadsEnabled() {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
}

export function cloudinaryMetadataEnabled() {
  return cloudinaryUploadsEnabled() && process.env.VERCEL === "1";
}

function buildContextString(metadata: Record<string, string | undefined>) {
  return Object.entries(metadata)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeMetadataValue(value!)}`)
    .join("|");
}

export function createSignedCloudinaryUpload(params: {
  folderName: "videos" | "thumbnails";
  resourceType: "video" | "image";
}) {
  if (!cloudinaryUploadsEnabled()) {
    throw new Error("Cloudinary upload is not configured.");
  }

  const timestamp = `${Math.floor(Date.now() / 1000)}`;
  const folder = `bitstream/${params.folderName}`;
  const publicId = `${params.folderName}-${Date.now()}-${crypto.randomUUID()}`;
  const tags = BITSTREAM_TAG;
  const signature = createCloudinarySignature({
    folder,
    public_id: publicId,
    tags,
    timestamp,
  });

  return {
    apiKey: CLOUDINARY_API_KEY!,
    cloudName: CLOUDINARY_CLOUD_NAME!,
    folder,
    publicId,
    resourceType: params.resourceType,
    signature,
    tags,
    timestamp,
  } satisfies SignedCloudinaryUpload;
}

async function uploadToCloudinary(
  file: File,
  folderName: "videos" | "thumbnails",
  resourceType: "video" | "image",
) {
  if (!cloudinaryUploadsEnabled()) {
    return persistFile(file, folderName);
  }

  assertWithinSizeLimit(file, folderName);
  const signedUpload = createSignedCloudinaryUpload({ folderName, resourceType });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signedUpload.apiKey);
  formData.append("timestamp", signedUpload.timestamp);
  formData.append("folder", signedUpload.folder);
  formData.append("public_id", signedUpload.publicId);
  formData.append("signature", signedUpload.signature);
  formData.append("tags", signedUpload.tags);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signedUpload.cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const payload = (await response.json()) as CloudinaryUploadResult & { error?: { message?: string } };

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Cloud upload failed.");
  }

  return {
    publicId: payload.public_id,
    url: payload.secure_url,
  };
}

async function updateCloudinaryVideoMetadata(params: {
  publicId: string;
  approvalStatus: ApprovalStatus;
  category: ContentCategory;
  title: string;
  description: string;
  durationLabel: string;
  thumbnailUrl: string;
  uploaderEmail: string;
  uploaderName: string;
  uploaderRole: string;
  slug: string;
  tags: string[];
  notes?: string;
  reviewedAt?: string;
  reviewedByEmail?: string;
}) {
  const timestamp = `${Math.floor(Date.now() / 1000)}`;
  const context = buildContextString({
    approval_status: params.approvalStatus,
    category: params.category,
    title: params.title,
    description: params.description,
    duration_label: params.durationLabel,
    thumbnail_url: params.thumbnailUrl,
    uploader_email: params.uploaderEmail,
    uploader_name: params.uploaderName,
    uploader_role: params.uploaderRole,
    slug: params.slug,
    updated_at: new Date().toISOString(),
    review_notes: params.notes,
    reviewed_at: params.reviewedAt,
    reviewed_by_email: params.reviewedByEmail,
  });
  const tags = [BITSTREAM_TAG, ...params.tags].join(",");
  const signature = createCloudinarySignature({
    context,
    public_id: params.publicId,
    tags,
    timestamp,
    type: "upload",
  });

  const formData = new FormData();
  formData.append("api_key", CLOUDINARY_API_KEY!);
  formData.append("timestamp", timestamp);
  formData.append("public_id", params.publicId);
  formData.append("type", "upload");
  formData.append("context", context);
  formData.append("tags", tags);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/explicit`,
    {
      method: "POST",
      body: formData,
    },
  );

  const payload = (await response.json()) as CloudinaryUploadResult & { error?: { message?: string } };

  if (!response.ok) {
    throw new Error(payload.error?.message || "Unable to update Cloudinary metadata.");
  }

  return payload;
}

async function fetchCloudinaryVideoResources() {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video/tags/${BITSTREAM_TAG}?context=true&max_results=500`,
    {
      headers: {
        Authorization: getCloudinaryBasicAuthHeader(),
      },
    },
  );

  const payload = (await response.json()) as { resources?: CloudinaryUploadResult[]; error?: { message?: string } };

  if (!response.ok) {
    throw new Error(payload.error?.message || "Unable to fetch Cloudinary resources.");
  }

  return payload.resources || [];
}

async function fetchCloudinaryVideoResource(publicId: string) {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/video/upload/${encodeURIComponent(publicId)}?context=true`,
    {
      headers: {
        Authorization: getCloudinaryBasicAuthHeader(),
      },
    },
  );

  const payload = (await response.json()) as CloudinaryUploadResult & { error?: { message?: string } };

  if (!response.ok) {
    throw new Error(payload.error?.message || "Unable to fetch Cloudinary resource.");
  }

  return payload;
}

function mapCloudinaryResourceToMedia(resource: CloudinaryUploadResult): MediaItem {
  const context = resource.context?.custom || {};
  const approvalStatus = (decodeMetadataValue(context.approval_status) || "pending") as ApprovalStatus;
  const tags = (resource.tags || []).filter((tag) => tag !== BITSTREAM_TAG);
  const thumbnailUrl = decodeMetadataValue(context.thumbnail_url) || "/placeholder.jpg";
  const durationLabel =
    decodeMetadataValue(context.duration_label) || formatDurationLabelFromSeconds(resource.duration);

  return {
    id: resource.public_id,
    slug: decodeMetadataValue(context.slug) || resource.public_id,
    title: decodeMetadataValue(context.title) || "Untitled upload",
    description: decodeMetadataValue(context.description) || "",
    category: (decodeMetadataValue(context.category) || "Campus Stories") as ContentCategory,
    tags,
    durationLabel,
    videoUrl: resource.secure_url,
    thumbnailUrl,
    submittedAt: resource.created_at || new Date().toISOString(),
    updatedAt: decodeMetadataValue(context.updated_at) || resource.created_at || new Date().toISOString(),
    uploader: {
      email: decodeMetadataValue(context.uploader_email) || "unknown@goa.bits-pilani.ac.in",
      name: decodeMetadataValue(context.uploader_name) || "Student",
      role: decodeMetadataValue(context.uploader_role) === "admin" ? "admin" : "student",
      image: null,
    },
    approval: {
      status: approvalStatus,
      notes: decodeMetadataValue(context.review_notes) || undefined,
      reviewedAt: decodeMetadataValue(context.reviewed_at) || undefined,
      reviewedByEmail: decodeMetadataValue(context.reviewed_by_email) || undefined,
    },
    stats: {
      views: 0,
      likes: 0,
    },
  };
}

export async function persistVideoUpload(file: File): Promise<UploadedAsset> {
  return uploadToCloudinary(file, "videos", "video");
}

export async function persistThumbnailUpload(file: File): Promise<UploadedAsset> {
  return uploadToCloudinary(file, "thumbnails", "image");
}

export async function createCloudinarySubmissionRecord(params: {
  publicId: string;
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  durationLabel: string;
  thumbnailUrl: string;
  uploaderEmail: string;
  uploaderName: string;
  uploaderRole: string;
  tags: string[];
}) {
  const resource = await updateCloudinaryVideoMetadata({
    publicId: params.publicId,
    approvalStatus: "pending",
    category: params.category,
    description: params.description,
    durationLabel: params.durationLabel,
    slug: params.slug,
    tags: params.tags,
    thumbnailUrl: params.thumbnailUrl,
    title: params.title,
    uploaderEmail: params.uploaderEmail,
    uploaderName: params.uploaderName,
    uploaderRole: params.uploaderRole,
  });

  return mapCloudinaryResourceToMedia(resource);
}

export async function updateCloudinarySubmissionReview(params: {
  publicId: string;
  approvalStatus: Extract<ApprovalStatus, "approved" | "rejected">;
  notes?: string;
  reviewedByEmail: string;
}) {
  const existing = await fetchCloudinaryVideoResource(params.publicId);
  const current = mapCloudinaryResourceToMedia(existing);
  const updated = await updateCloudinaryVideoMetadata({
    publicId: params.publicId,
    approvalStatus: params.approvalStatus,
    category: current.category,
    description: current.description,
    durationLabel: current.durationLabel,
    slug: current.slug,
    tags: current.tags,
    thumbnailUrl: current.thumbnailUrl,
    title: current.title,
    uploaderEmail: current.uploader.email,
    uploaderName: current.uploader.name,
    uploaderRole: current.uploader.role,
    notes: params.notes?.trim() || undefined,
    reviewedAt: new Date().toISOString(),
    reviewedByEmail: params.reviewedByEmail.toLowerCase(),
  });

  return mapCloudinaryResourceToMedia(updated);
}

export async function listCloudinaryMedia() {
  const resources = await fetchCloudinaryVideoResources();
  return resources.map(mapCloudinaryResourceToMedia);
}
