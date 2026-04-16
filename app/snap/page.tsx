import { cloudinaryUploadsEnabled } from "@/backend/storage/file-uploads";
import { SnapPage } from "@/frontend/modules/snap/snap-page";

export const metadata = {
  title: "Snap | BITStream",
  description: "24-hour campus snaps, reactions, and quick comments for BITS Goa.",
};

export default async function Page() {
  const directUploadEnabled = cloudinaryUploadsEnabled() || process.env.VERCEL !== "1";

  return <SnapPage directUploadEnabled={directUploadEnabled} initialFeed={{ enabled: true, items: [] }} />;
}
