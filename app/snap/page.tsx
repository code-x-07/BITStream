import { requireCampusUser } from "@/backend/auth/session";
import { listActiveSnaps } from "@/backend/snap/service";
import { cloudinaryUploadsEnabled } from "@/backend/storage/file-uploads";
import { SnapPage } from "@/frontend/modules/snap/snap-page";

export const metadata = {
  title: "Snap | BITStream",
  description: "24-hour campus snaps, reactions, and quick comments for BITS Goa.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await requireCampusUser("/snap");
  const initialFeed = await listActiveSnaps(user.email);
  const directUploadEnabled = cloudinaryUploadsEnabled() || process.env.VERCEL !== "1";

  return <SnapPage currentUser={user} directUploadEnabled={directUploadEnabled} initialFeed={initialFeed} />;
}
