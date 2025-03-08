"use client"

import { Check, Copy } from "lucide-react"
import React, { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  dracula,
  oneDark,
  vscDarkPlus,
  darcula,
} from "react-syntax-highlighter/dist/cjs/styles/prism"

const CodeBlock = ({
  className,
  children,
}: {
  className?: string
  children: string
}) => {
  const [copied, setCopied] = useState(false)

  // Extract language from className (format: "language-{languageName}")
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : "text"

  // Format language name for display
  const formatLanguage = (lang: string) => {
    const languageMap: Record<string, string> = {
      js: "JavaScript",
      jsx: "JSX",
      ts: "TypeScript",
      tsx: "TSX",
      py: "Python",
      css: "CSS",
      html: "HTML",
      bash: "Bash",
      md: "Markdown",
      json: "JSON",
      sql: "SQL",
      text: "Text",
    }

    return languageMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
  }

  // Copy code to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6 rounded-md overflow-hidden not-prose">
      {/* Language label and copy button */}
      <div className="text-xs font-mono px-4 py-1.5 bg-neutral-800 dark:bg-neutral-900 text-neutral-300 border-b border-neutral-700 flex justify-between items-center">
        <span>{formatLanguage(language)}</span>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code with syntax highlighting */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: "0 0 0.375rem 0.375rem",
          fontSize: "0.875rem",
        }}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
