import React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import AllBlogs from "@/components/blog/all-blogs"
import { motion } from "framer-motion"

const Page = () => {
  const blogDir = "blogs"
  const files = fs.readdirSync(path.join(blogDir))

  const blogs = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8")
    const { data: frontMatter } = matter(fileContent)
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    }
  })

  // Sort blogs by date (newest first)
  const sortedBlogs = blogs.sort((a, b) => {
    const dateA = new Date(a.meta.date)
    const dateB = new Date(b.meta.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <main className="flex flex-col max-w-4xl mx-auto px-4">
      <AllBlogs blogs={blogs} />
    </main>
  )
}

export default Page
