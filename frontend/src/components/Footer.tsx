import Link from "next/link";
import React from "react";

type LinkHref = Parameters<typeof Link>[0]["href"];

export function Footer(): React.JSX.Element {
  return (
    <footer className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)] w-full">
      <div>
        Built by <span className="font-semibold text-white">CiaoRaviRaj</span> — © 2026 All rights reserved.
      </div>
      <div className="flex gap-4">
        <Link href={"/privacy" as LinkHref} className="hover:text-white transition-colors duration-200">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link href={"/legal" as LinkHref} className="hover:text-white transition-colors duration-200">
          Legal Notice
        </Link>
      </div>
    </footer>
  );
}
