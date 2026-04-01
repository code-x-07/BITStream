import { AlertCircle, LockKeyhole, MailCheck } from "lucide-react";
import { Navbar } from "@/frontend/components/navbar";
import { SiteFooter } from "@/frontend/components/site-footer";
import { loginWithGoogle } from "@/backend/auth/actions";
import { ALLOWED_EMAIL_DOMAIN } from "@/backend/auth/config";

interface LoginPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function normalize(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams = (await searchParams) || {};
  const next = normalize(resolvedParams.next) || "/";
  const error = normalize(resolvedParams.error);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex min-h-[calc(100vh-180px)] items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-border/70 bg-card/50 p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Secure login</p>
            <h1 className="mt-3 text-4xl font-bold text-foreground">Google sign-in for Goa BITS accounts only</h1>
            <p className="mt-4 text-muted-foreground">
              The app accepts Google logins only when the email ends with{" "}
              <span className="font-semibold text-foreground">@{ALLOWED_EMAIL_DOMAIN}</span>.
            </p>

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4" />
                <span>
                  Access was denied. Sign in with a verified <strong>@{ALLOWED_EMAIL_DOMAIN}</strong> account.
                </span>
              </div>
            )}

            <form action={loginWithGoogle} className="mt-8">
              <input type="hidden" name="redirectTo" value={next} />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <LockKeyhole className="h-4 w-4" />
                Continue with Google
              </button>
            </form>
          </section>

          <aside className="rounded-[2rem] border border-border/70 bg-card/40 p-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MailCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Domain-restricted access</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Only Goa campus accounts can upload content or review moderation items.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Admin approvals stay separate</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Admin rights come from the configured allow-list, not from the login provider alone.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
