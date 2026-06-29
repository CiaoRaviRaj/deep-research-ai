import type { Metadata } from "next";
import { ResearchDashboard } from "@/components/research/ResearchDashboard";
import { HealthStatus } from "@/components/health/HealthStatus";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Deep Research Engine — Console Dashboard",
  description: "Enterprise multi-agent research orchestration console with real-time SSE streaming.",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
};

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ---------- Top Telemetry Console Bar ---------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[var(--color-surface-50)] border border-[var(--color-border)] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-xl" />
            <div>
              <h2 className="font-outfit text-sm font-extrabold text-[var(--color-text-primary)] tracking-tight leading-none">
                Deep Research Console
              </h2>
              <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                v0.6.0 • Enterprise Core
              </span>
            </div>
          </div>

          {/* Micro health indicator tag */}
          <div className="flex items-center">
            <ThemeToggle />
            <HealthStatus />
          </div>
        </div>

        {/* ---------- Main Orchestrated Dashboard ---------- */}
        <section aria-label="Research Dashboard Application">
          <ResearchDashboard />
        </section>

        {/* ---------- Footer ---------- */}
        <Footer />
      </div>
    </main>
  );
}
