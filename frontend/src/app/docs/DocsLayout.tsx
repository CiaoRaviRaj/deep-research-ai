"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MarkdownRenderer } from "@/components/research/MarkdownRenderer";

interface DocsLayoutProps {
  projectDetails: string;
  systemGuide: string;
}

type DocId = "system-guide" | "project-details";

export function DocsLayout({ projectDetails, systemGuide }: DocsLayoutProps): React.JSX.Element {
  const [activeDoc, setActiveDoc] = useState<DocId>("system-guide");

  const docs = [
    {
      id: "system-guide" as DocId,
      title: "System & Architecture Guide",
      subtitle: "Overview, data flow, structure, and developer setup.",
      content: systemGuide,
    },
    {
      id: "project-details" as DocId,
      title: "Project details",
      subtitle: "Tech stack, safety guidelines, and database roles.",
      content: projectDetails,
    },
  ];

  const activeDocData = docs.find((d) => d.id === activeDoc) ?? docs[0]!;

  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ---------- Header bar ---------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[var(--color-surface-50)] border border-[var(--color-border)] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-xl" />
            <div>
              <h2 className="font-outfit text-sm font-extrabold text-[var(--color-text-primary)] tracking-tight leading-none">
                Deep Research Documentation
              </h2>
              <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                Console Docs • Reference Guide
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* ---------- Main Layout ---------- */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-3 glass-panel rounded-2xl p-5 flex flex-col">
            <h3 className="font-outfit text-xs font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 px-1">
              Documents
            </h3>
            <div className="space-y-1">
              {docs.map((doc) => {
                const isActive = doc.id === activeDoc;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDoc(doc.id)}
                    className={`w-full text-left rounded-xl p-3 border transition-all duration-200 focus:outline-none ${
                      isActive
                        ? "bg-violet-600/10 border-violet-500/30 text-[var(--color-brand-400)] shadow-sm"
                        : "bg-transparent border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-100)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    <div className="font-outfit text-sm font-bold leading-tight">
                      {doc.title}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)] font-medium mt-1 leading-snug">
                      {doc.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content panel */}
          <article className="lg:col-span-9 glass-panel rounded-2xl p-6 md:p-10 space-y-6 flex flex-col">
            <div className="pb-4 border-b border-[var(--color-border)]">
              <h1 className="font-outfit text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                {activeDocData.title}
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
                Official Platform Technical Reference
              </p>
            </div>

            <div className="prose max-w-none">
              <MarkdownRenderer content={activeDocData.content} variant="normal" />
            </div>
          </article>
        </div>

        {/* ---------- Footer ---------- */}
        <div className="pt-6 border-t border-[var(--color-border)]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
