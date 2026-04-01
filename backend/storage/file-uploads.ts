import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_VIDEO_SIZE_BYTES = 40 * 1024 * 1024;
const MAX_IMAGE_SIZE_BYTES = 6 * 1024 * 1024;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();

function sanitizeFileName(fileName: string) {
  const extension = path.extname(fileName).toLowerCase() || ".bin";
  return `${Date.now()}-${crypto.randomUUID()}${extension.replace(/[^a-z0-9.]/g, "")}`;
}

async function persistFile(file: File, folderName: "videos" | "thumbnails") {
  if (!file || file.size === 0) {
    return "";
  }

  const maxBytes = folderName === "videos" ? MAX_VIDEO_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;

  if (file.size > maxBytes) {
    throw new Error(
      folderName === "videos"
        ? "Video file is too large for the local demo setup. Use a smaller clip or paste a hosted MP4/WebM URL."
        : "Thumbnail image is too large.",
    );
  }

  const safeFileName = sanitizeFileName(file.name);
  const uploadDirectory = path.join(process.cwd(), "public", "uploads", folderName);
  const absolutePath = path.join(uploadDirectory, safeFileName);

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return `/uploads/${folderName}/${safeFileName}`;
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

function createCloudinarySignature(params: Record<string, string>) {
  const payload = Object.entries(params)
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${payload}${CLOUDINARY_API_SECRET}`)
    .digest("hex");
}

export function cloudinaryUploadsEnabled() {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
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

  const timestamp = `${Math.floor(Date.now() / 1000)}`;
  const folder = `bitstream/${folderName}`;
  const publicId = `${folderName}-${Date.now()}-${crypto.randomUUID()}`;
  const signature = createCloudinarySignature({
    folder,
    public_id: publicId,
    timestamp,
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", CLOUDINARY_API_KEY!);
  formData.append("timestamp", timestamp);
  formData.append("folder", folder);
  formData.append("public_id", publicId);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const payload = (await response.json()) as { secure_url?: string; error?: { message?: string } };

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Cloud upload failed.");
  }

  return payload.secure_url;
}

export async function persistVideoUpload(file: File) {
  return uploadToCloudinary(file, "videos", "video");
}

export async function persistThumbnailUpload(file: File) {
  return uploadToCloudinary(file, "thumbnails", "image");
}
