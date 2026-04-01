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

function withCurtainEntry(next: string) {
  const separator = next.includes("?") ? "&" : "?";
  return `${next}${separator}entry=curtain`;
}

export async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams = (await searchParams) || {};
  const next = normalize(resolvedParams.next) || "/";
  const error = normalize(resolvedParams.error);
  const redirectTarget = withCurtainEntry(next);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(10,13,20,0.9) 12%, rgba(10,13,20,0.52) 44%, rgba(10,13,20,0.82) 100%), url('/login-assets/projector-login.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(248,231,184,0.42),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.3))]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-140px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:py-14">
          <section className="rounded-[2rem] border border-white/10 bg-[#0b1320]/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-md sm:p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.36em] text-[#f0d6a8]">Secure entry</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Lights on. Sign in and step into the stream.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#d1d9e3] sm:text-base">
              Access is restricted to <span className="font-semibold text-white">@{ALLOWED_EMAIL_DOMAIN}</span> accounts so
              the space stays campus-only and moderation stays in the right hands.
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
              <input type="hidden" name="redirectTo" value={redirectTarget} />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#f0d6a8] px-6 py-4 text-sm font-semibold text-[#111827] transition-all duration-300 hover:bg-[#f7dfb7] hover:shadow-[0_18px_42px_rgba(240,214,168,0.26)]"
              >
                <LockKeyhole className="h-4 w-4" />
                Continue with Google
              </button>
            </form>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#f0d6a8]">Access</p>
                <p className="mt-3 text-2xl font-semibold text-white">Campus-only</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#f0d6a8]">Moderation</p>
                <p className="mt-3 text-2xl font-semibold text-white">Admin review</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#f0d6a8]">Entry</p>
                <p className="mt-3 text-2xl font-semibold text-white">Fast curtain</p>
              </div>
            </div>
          </section>

          <aside className="relative hidden min-h-[560px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/20 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-sm lg:block">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,211,161,0.22),transparent_30%),radial-gradient(circle_at_85%_28%,rgba(255,247,210,0.5),transparent_26%),linear-gradient(180deg,rgba(7,17,29,0.08),rgba(7,17,29,0.72))]" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#f0d6a8]">
                  Projector mode
                </div>
                <div className="max-w-md rounded-[1.8rem] border border-white/10 bg-[#0a111c]/68 p-6 backdrop-blur-md">
                  <p className="text-3xl font-semibold leading-tight text-white">
                    A cleaner sign-in, then a quick stage-style reveal into home.
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-[1.8rem] border border-white/10 bg-[#0a111c]/72 p-6 backdrop-blur-md">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d6a8]/12 text-[#f0d6a8]">
                    <MailCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Domain-restricted access</p>
                    <p className="mt-1 text-sm text-[#c5cfdb]">
                      Only Goa campus accounts can upload content or review moderation items.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d6a8]/12 text-[#f0d6a8]">
                    <LockKeyhole className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Admin approvals stay separate</p>
                    <p className="mt-1 text-sm text-[#c5cfdb]">
                      Admin rights come from the configured allow-list, not from the login provider alone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <aside className="rounded-[2rem] border border-white/10 bg-[#0b1320]/72 p-6 backdrop-blur-md lg:hidden">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d6a8]/12 text-[#f0d6a8]">
                  <MailCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Domain-restricted access</p>
                  <p className="mt-1 text-sm text-[#c5cfdb]">
                    Only Goa campus accounts can upload content or review moderation items.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d6a8]/12 text-[#f0d6a8]">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Admin approvals stay separate</p>
                  <p className="mt-1 text-sm text-[#c5cfdb]">
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
