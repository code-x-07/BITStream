import Link from "next/link";
import { Clapperboard, ShieldCheck, Upload } from "lucide-react";
import { getCurrentUser } from "@/backend/auth/session";
import { loginWithGoogle, logoutAction } from "@/backend/auth/actions";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-cyan-400 to-secondary shadow-[0_10px_40px_rgba(99,102,241,0.4)]">
            <Clapperboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">BITStream</p>
            <p className="text-xs text-muted-foreground">Campus uploads with approval workflow</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Discover
          </Link>
          <Link href="/upload" className="transition-colors hover:text-primary">
            Upload
          </Link>
          {user && (
            <Link href="/my-uploads" className="transition-colors hover:text-primary">
              My Uploads
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" className="transition-colors hover:text-primary">
              Admin Queue
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden rounded-full border border-border/80 bg-card/70 px-4 py-2 text-right sm:block">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {user.role === "admin" ? "Admin" : "Student"}
                </p>
              </div>
              <Link
                href={user.role === "admin" ? "/admin" : "/upload"}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                {user.role === "admin" ? <ShieldCheck className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                {user.role === "admin" ? "Review uploads" : "Upload media"}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <form action={loginWithGoogle}>
              <input type="hidden" name="redirectTo" value="/" />
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign in with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
