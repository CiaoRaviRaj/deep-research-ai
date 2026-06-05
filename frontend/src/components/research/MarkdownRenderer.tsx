"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  variant?: "compact" | "normal";
}

export function MarkdownRenderer({ content, variant = "normal" }: MarkdownRendererProps): React.JSX.Element {
  if (!content) return <span />;

  if (variant === "compact") {
    return (
      <ReactMarkdown
        components={{
          h1: ({ node: _node, ...props }) => (
            <h1 className="text-base font-bold font-outfit mt-3 mb-1 text-white" {...props} />
          ),
          h2: ({ node: _node, ...props }) => (
            <h2 className="text-sm font-bold font-outfit mt-3 mb-1 text-white" {...props} />
          ),
          h3: ({ node: _node, ...props }) => (
            <h3 className="text-xs font-bold font-outfit mt-2 mb-1 text-violet-200" {...props} />
          ),
          ul: ({ node: _node, ...props }) => (
            <ul className="list-disc pl-4 my-2 text-xs text-[var(--color-text-secondary)] space-y-0.5" {...props} />
          ),
          ol: ({ node: _node, ...props }) => (
            <ol className="list-decimal pl-4 my-2 text-xs text-[var(--color-text-secondary)] space-y-0.5" {...props} />
          ),
          li: ({ node: _node, ...props }) => (
            <li className="text-xs text-[var(--color-text-secondary)] mb-0.5 ml-3 list-disc" {...props} />
          ),
          p: ({ node: _node, ...props }) => (
            <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] mb-2" {...props} />
          ),
          strong: ({ node: _node, ...props }) => (
            <strong className="text-white font-semibold" {...props} />
          ),
          code: ({ node: _node, ...props }) => (
            <code className="bg-[var(--color-surface-200)] px-1 py-0.5 rounded text-[10px] font-mono text-violet-300 border border-[var(--color-border)]" {...props} />
          ),
          pre: ({ node: _node, ...props }) => (
            <pre className="bg-[var(--color-surface-200)] p-2 rounded text-[10px] font-mono text-violet-300 border border-[var(--color-border)] overflow-x-auto my-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }

  return (
    <ReactMarkdown
      components={{
        h1: ({ node: _node, ...props }) => (
          <h1 className="text-xl font-bold font-outfit mt-5 mb-2 text-white border-b border-[var(--color-border)] pb-2" {...props} />
        ),
        h2: ({ node: _node, ...props }) => (
          <h2 className="text-lg font-bold font-outfit mt-4 mb-2 text-white" {...props} />
        ),
        h3: ({ node: _node, ...props }) => (
          <h3 className="text-sm font-bold font-outfit mt-3.5 mb-1.5 text-violet-200" {...props} />
        ),
        ul: ({ node: _node, ...props }) => (
          <ul className="list-disc pl-5 my-3 text-sm text-[var(--color-text-secondary)] space-y-1" {...props} />
        ),
        ol: ({ node: _node, ...props }) => (
          <ol className="list-decimal pl-5 my-3 text-sm text-[var(--color-text-secondary)] space-y-1" {...props} />
        ),
        li: ({ node: _node, ...props }) => (
          <li className="text-sm text-[var(--color-text-secondary)] mb-1 leading-relaxed ml-5 list-disc" {...props} />
        ),
        p: ({ node: _node, ...props }) => (
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-2.5" {...props} />
        ),
        strong: ({ node: _node, ...props }) => (
          <strong className="text-white font-extrabold" {...props} />
        ),
        code: ({ node: _node, ...props }) => (
          <code className="bg-[var(--color-surface-200)] px-1.5 py-0.5 rounded text-xs font-mono text-violet-300 border border-[var(--color-border)]" {...props} />
        ),
        pre: ({ node: _node, ...props }) => (
          <pre className="bg-[var(--color-surface-200)] p-3 rounded text-xs font-mono text-violet-300 border border-[var(--color-border)] overflow-x-auto my-3" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
