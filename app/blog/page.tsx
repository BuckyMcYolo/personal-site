import React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import AllBlogs from "@/components/blog/all-blogs"
import { motion } from "framer-motion"
import moment from "moment"

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
  const sortedBlogs = blogs.sort((a, b) => {
    // Handle string dates in various formats
    let dateA, dateB

    try {
      // Use moment to parse dates with ordinal indicators like "18th April 2025"
      dateA = a.meta.date
        ? moment(
            a.meta.date,
            [
              "DD MMM YYYY", // 18 Apr 2025
              "Do MMMM YYYY", // 18th April 2025
              "YYYY-MM-DD", // 2025-04-18
              "MMMM DD, YYYY", // April 18, 2025
              "MMM DD, YYYY", // Apr 18, 2025
              "MMMM Do YYYY", // April 18th 2025
            ],
            true
          )
        : moment(0)

      dateB = b.meta.date
        ? moment(
            b.meta.date,
            [
              "DD MMM YYYY",
              "Do MMMM YYYY",
              "YYYY-MM-DD",
              "MMMM DD, YYYY",
              "MMM DD, YYYY",
              "MMMM Do YYYY",
            ],
            true
          )
        : moment(0)

      // Check if dates are valid
      if (!dateA.isValid()) dateA = moment(0)
      if (!dateB.isValid()) dateB = moment(0)
    } catch (error) {
      console.error("Error parsing dates:", error)
      return 0
    }

    return dateB.valueOf() - dateA.valueOf()
  })

  return (
    <main className="flex flex-col max-w-4xl mx-auto px-4">
      <AllBlogs blogs={sortedBlogs} />
    </main>
  )
}

export default Page
