import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Deep Research Console",
  description: "Privacy policy and data governance practices for the Enterprise Deep Research Console.",
};

export default function PrivacyPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* ---------- Header Bar ---------- */}
        <div className="flex items-center justify-between bg-[var(--color-surface-50)] border border-[var(--color-border)] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded-xl" />
            <div>
              <h2 className="font-outfit text-xs font-extrabold text-white tracking-tight leading-none">
                Deep Research Console
              </h2>
              <span className="text-[9px] text-[var(--color-text-muted)] font-medium">
                v0.6.0 • Security & Trust
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors duration-200 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* ---------- Main Content ---------- */}
        <article className="bg-[var(--color-surface-50)] border border-[var(--color-border)] rounded-3xl p-6 md:p-10 space-y-8 text-[var(--color-text-secondary)]">
          <header className="space-y-3">
            <h1 className="font-outfit text-3xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              Last Updated: June 5, 2026
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">1. Data Ownership & Sovereignty</h2>
            <p className="text-sm leading-relaxed">
              All research sessions, search queries, scraped source materials, and synthesized intelligence reports generated within the Deep Research Platform remain the exclusive property of the operating organization. We do not sell, license, or share session data with third-party providers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">2. Information Collection</h2>
            <p className="text-sm leading-relaxed">
              To operate the orchestrated search agent workflows, the system processes:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2 text-[var(--color-text-secondary)]">
              <li>User-provided search queries and configurations (model, max sources, depth parameters).</li>
              <li>Scraped webpage texts retrieved from public index lookups (Google/Bing/DuckDuckGo).</li>
              <li>Agent performance logs, token consumption telemetry, and model execution steps.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">3. Data Security & Storage</h2>
            <p className="text-sm leading-relaxed">
              All processed data is securely housed in our PostgreSQL and Redis databases behind firewalls. API tokens and sensitive credentials utilized for search API orchestration are encrypted at rest.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">4. Cookies & Browser Storage</h2>
            <p className="text-sm leading-relaxed">
              The application uses standard local storage mechanisms for session history management. No advertising, targeting, or non-functional tracking cookies are deployed by this platform.
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--color-border)]">
            <Footer />
          </div>
        </article>
      </div>
    </main>
  );
}
