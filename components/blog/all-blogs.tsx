"use client"

import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"
import { Badge } from "../ui/badge"

const AllBlogs = ({
  blogs,
  recentBlogs,
}: {
  blogs: {
    meta: {
      [key: string]: any
    }
    slug: string
  }[]
  recentBlogs?: boolean
}) => {
  // Extract categories if they exist

  return (
    <section className="py-12">
      {recentBlogs ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-3">Recent Blogs</h1>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, ideas, and technical explorations.
          </p>
        </motion.div>
      )}
      <div className="grid gap-4 md:gap-6">
        {blogs.map((blog, idx) => {
          const categories = blog.meta.categories || []
          return (
            <Link href={"/blog/" + blog.slug} passHref key={blog.slug}>
              <motion.div
                className="group relative flex flex-col sm:flex-row justify-between gap-4 border border-border rounded-xl p-6 hover:bg-accent/50 hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.25, duration: 0.4 }}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {categories.map((category: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {blog.meta.title}
                  </h3>

                  <p className="text-muted-foreground text-base mb-3 line-clamp-2">
                    {blog.meta.description}
                  </p>

                  {blog.meta.date && (
                    <div className="flex items-center text-muted-foreground text-sm">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>{blog.meta.date}</span>
                    </div>
                  )}

                  {blog.meta.tags ? (
                    <div className="flex items-center gap-2 pt-3">
                      {blog.meta.tags.map((tag: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant={"secondary"}
                          className="capitalize"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center justify-end">
                  <motion.div
                    className="p-2 rounded-full bg-primary/10 text-primary group-hover:translate-x-1 transition-transform duration-300"
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRightIcon size={20} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default AllBlogs
