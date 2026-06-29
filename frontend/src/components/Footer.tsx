import Link from "next/link";
import React from "react";
import IconProvider from "@/components/common/IconProvider";
import { APP_CONFIG_URL } from "@/constants/appConstant";

type LinkHref = Parameters<typeof Link>[0]["href"];

export function Footer(): React.JSX.Element {
  return (
    <footer className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)] w-full">
      <div className="flex items-center">
        Built by <span className="font-semibold text-[var(--color-text-primary)]">CiaoRaviRaj</span> — © 2026 All rights reserved.
        <Link href={APP_CONFIG_URL.GIT_HUB_PROJECT as LinkHref} target={"_blank"} className="ml-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200 inline-flex items-center align-middle">
          <IconProvider icon="GIT_HUB" size={16} />
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href={APP_CONFIG_URL.DOCS as LinkHref} target={"_blank"} className="hover:text-[var(--color-text-primary)] transition-colors duration-200">
          Docs
        </Link>
        <Link href={APP_CONFIG_URL.PRIVACY_POLICY as LinkHref} className="hover:text-[var(--color-text-primary)] transition-colors duration-200">
          Privacy Policy
        </Link>
        <Link href={APP_CONFIG_URL.LEGAL_NOTICE as LinkHref} className="hover:text-[var(--color-text-primary)] transition-colors duration-200">
          Legal Notice
        </Link>
      </div>
    </footer>
  );
}
