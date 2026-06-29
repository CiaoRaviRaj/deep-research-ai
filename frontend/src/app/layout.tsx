/**
 * ============================================
 * Deep Research Platform - Root Layout
 * ============================================
 * App Router root layout — wraps every page.
 *
 * Responsibilities:
 * - HTML/body shell
 * - Font loading via next/font (zero-CLS)
 * - Root metadata (SEO baseline)
 * - Global providers (QueryClient, FeatureFlags)
 * - Global CSS
 * ============================================
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Deep Research Platform",
    template: "%s | Deep Research",
  },
  description:
    "Enterprise AI Research Agent Platform — multi-agent research orchestration with real-time streaming.",
  robots: { index: false, follow: false }, // Private platform
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f13",
  colorScheme: "dark",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('dr:theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (savedTheme === 'system' || !savedTheme ? (systemDark ? 'dark' : 'light') : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
