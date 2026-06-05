"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useResearchStore } from "@/store/research.store";
import { SessionList } from "@/components/research/SessionList";
import { SessionDetails } from "@/components/research/SessionDetails";
import { appConfig } from "@/config/app.config";
import { HealthStatus } from "@/components/health/HealthStatus";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    reaseachId: string;
  }>;
}

export default function ReaseachDetailPage({ params }: PageProps): React.JSX.Element {
  const unwrappedParams = React.use(params);
  const reaseachId = unwrappedParams.reaseachId;
  const { setActiveSessionId } = useResearchStore();
  const [isValidating, setIsValidating] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (!reaseachId) return;

    let active = true;

    async function checkSessionExists() {
      try {
        const res = await fetch(`${appConfig.apiV1Url}/research/session/${reaseachId}`);
        if (!res.ok) {
          if (active) {
            setIsNotFound(true);
          }
        } else {
          if (active) {
            setActiveSessionId(reaseachId);
          }
        }
      } catch (err) {
        console.error("Failed to validate research session ID:", err);
        if (active) {
          setIsNotFound(true);
        }
      } finally {
        if (active) {
          setIsValidating(false);
        }
      }
    }

    checkSessionExists();

    return () => {
      active = false;
    };
  }, [reaseachId, setActiveSessionId]);

  if (isNotFound) {
    notFound();
  }

  if (isValidating) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)] px-4 py-8 md:px-8 md:py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-sm text-[var(--color-text-muted)] font-medium animate-pulse">
            Verifying research session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ---------- Top Telemetry Console Bar ---------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[var(--color-surface-50)] border border-[var(--color-border)] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-xl" />
            <div>
              <h2 className="font-outfit text-sm font-extrabold text-white tracking-tight leading-none">
                Deep Research Console
              </h2>
              <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                v0.6.0 • Enterprise Core
              </span>
            </div>
          </div>

          {/* Micro health indicator tag */}
          <div className="flex items-center gap-4">
            <HealthStatus />
          </div>
        </div>

        {/* ---------- Workspace View ---------- */}
        <div className="grid gap-6 lg:grid-cols-12 h-[calc(100vh-140px)] min-h-[500px]">
          {/* History Sidebar */}
          <div className="hidden lg:col-span-3 glass-panel rounded-2xl p-5 flex flex-col h-full">
            <SessionList />
          </div>

          {/* Active Workspace */}
          <div className="lg:col-span-9 h-full flex flex-col">
            <SessionDetails />
          </div>
        </div>
      </div>
    </main>
  );
}
