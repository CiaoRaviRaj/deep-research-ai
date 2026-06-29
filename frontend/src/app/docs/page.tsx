import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { DocsLayout } from "./DocsLayout";

export const metadata: Metadata = {
  title: "Documentation | Deep Research Console",
  description: "Technical reference documentation, system guide, and project details for the Deep Research Platform.",
};

function findDocsDir(): string {
  const pwd = process.env.PWD;
  const cwd = process.cwd();

  const searchPaths = [
    // PWD-relative paths (useful in Unix runtime/Docker environments)
    ...(pwd ? [
      path.join(pwd, "src", "docs"),
      path.join(pwd, "frontend", "src", "docs"),
      path.join(pwd, "docs"),
      path.join(pwd, "..", "docs"),
    ] : []),
    // CWD-relative paths (standard node process resolution)
    path.join(cwd, "src", "docs"),
    path.join(cwd, "frontend", "src", "docs"),
    path.join(cwd, "docs"),
    path.join(cwd, "..", "docs"),
  ];

  for (const p of searchPaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, "SYSTEM_GUIDE.md"))) {
      return p;
    }
  }

  // Fallback default
  return path.resolve(cwd, "..", "docs");
}

export default function DocsPage(): React.JSX.Element {
  const docsDir = findDocsDir();

  let projectDetails = "";
  let systemGuide = "";

  try {
    projectDetails = fs.readFileSync(path.join(docsDir, "PROJECT_DETAILS.md"), "utf8");
  } catch (error) {
    console.error("Failed to load PROJECT_DETAILS.md:", error);
  }

  try {
    systemGuide = fs.readFileSync(path.join(docsDir, "SYSTEM_GUIDE.md"), "utf8");
  } catch (error) {
    console.error("Failed to load SYSTEM_GUIDE.md:", error);
  }

  return <DocsLayout projectDetails={projectDetails} systemGuide={systemGuide} />;
}
