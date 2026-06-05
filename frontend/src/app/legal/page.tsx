import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Legal Notice | Deep Research Console",
  description: "Legal notices, terms of usage, and model disclaimers for the Deep Research Platform.",
};

export default function LegalPage(): React.JSX.Element {
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
                v0.6.0 • Legal Compliance
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
              Legal Notice
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              Last Updated: June 5, 2026
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">1. Service Provider</h2>
            <p className="text-sm leading-relaxed">
              This platform is an enterprise-grade agentic search console deployed and managed internally. For operational support or queries, contact the IT and Systems Administrator.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">2. Disclaimer of Liability</h2>
            <p className="text-sm leading-relaxed">
              The intelligence summaries and reports are compiled automatically by autonomous large language model (LLM) agents based on content fetched from public websites. 
            </p>
            <p className="text-sm leading-relaxed">
              While we optimize model temperature and use state-of-the-art architectures, the platform cannot guarantee the absolute accuracy, completeness, or freshness of the scraped details. Users are advised to review the provided primary references (sources) directly before making operational decisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">3. Intellectual Property Notice</h2>
            <p className="text-sm leading-relaxed">
              The custom vector graphics, layouts, UI styling, and agent code are protected by intellectual property rights. Unauthorized distribution, redistribution, or source replication without permission is prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-outfit text-lg font-bold text-white">4. API Usage Fair Policy</h2>
            <p className="text-sm leading-relaxed">
              Access to this console requires API quotas. Heavy automation, scraping of the console API, or intentional overload of the research worker processes violates the internal Acceptable Use Policy.
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
