import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import MdImage from "@/components/mdx/MdImage"
import CodeBlock from "@/components/mdx/CodeBlock"
import TableOfContents from "@/components/mdx/TableofContents"
import { ChevronDown, FileText } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { frontMatter } = getPost({ slug })

  return {
    title: frontMatter.title,
    description: frontMatter.description,
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"))

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }))
  return paths
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  )

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    frontMatter,
    slug,
    content,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { frontMatter, content } = getPost({ slug })

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  }
  const components = {
    MdImage,
    pre: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>
    },
    code: (props: any) => {
      const { className } = props
      const isInlineCode = !className

      if (isInlineCode) {
        return <code {...props} />
      }

      return <CodeBlock {...props} />
    },
    // Add IDs to headings for the table of contents
    h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      )
    },
    h4: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      return (
        <h4 id={id} {...props}>
          {children}
        </h4>
      )
    },
  }

  return (
    <main className="pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Desktop Table of Contents - Fixed position on right side */}
      <div className="hidden lg:block">
        <TableOfContents className="right-6" />
      </div>

      {/* Mobile Table of Contents button (sticky at top on mobile) */}
      <div className="lg:hidden sticky top-2 z-30 mb-6">
        <details className="not-prose border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 shadow-md group">
          <summary className="px-4 py-2 font-medium cursor-pointer bg-neutral-50 dark:bg-neutral-900/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>Table of Contents</span>
            </div>
            <div className="text-neutral-500">
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
            </div>
          </summary>
          <div className="p-4 max-h-[60vh] overflow-y-auto origin-top transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            <TableOfContents isMobile={true} />
          </div>
        </details>
      </div>

      {/* Article Content - Not affected by TOC */}
      <article className="prose prose-sm md:prose-base lg:prose-lg prose-neutral dark:prose-invert mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <h1 className="!mb-2 text-3xl sm:text-4xl font-bold">
              {frontMatter.title}
            </h1>
            <time className="text-sm text-neutral-500 dark:text-neutral-400 font-medium sm:ml-4 sm:shrink-0">
              {frontMatter.date}
            </time>
          </div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {frontMatter.description}
          </p>
        </header>

        <div>
          <MDXRemote
            source={content}
            options={options}
            components={components}
          />
        </div>
      </article>
    </main>
  )
}

export const dynamicParams = false
