import { HomePage } from "@/frontend/modules/home/home-page";

export const metadata = {
  title: "BITStream | Approved campus media",
  description: "Discover approved student uploads, movies, tutorials, and campus stories.",
};

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <HomePage searchParams={searchParams} />;
}
