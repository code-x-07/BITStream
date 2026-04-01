import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_VIDEO_SIZE_BYTES = 40 * 1024 * 1024;
const MAX_IMAGE_SIZE_BYTES = 6 * 1024 * 1024;

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

export async function persistVideoUpload(file: File) {
  return persistFile(file, "videos");
}

export async function persistThumbnailUpload(file: File) {
  return persistFile(file, "thumbnails");
}
