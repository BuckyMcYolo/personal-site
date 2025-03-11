"use client"

import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { Spotlight } from "../motion-primitives/spotlight"

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
        {blogs.length === 0 ? (
          <div className="text-muted-foreground">No blogs yet.</div>
        ) : (
          blogs.map((blog, idx) => {
            const categories = blog.meta.categories || []
            return (
              <Link href={"/blog/" + blog.slug} passHref key={blog.slug}>
                <motion.div
                  className="group relative flex flex-col sm:flex-row justify-between gap-4 border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 overflow-hidden hover:scale-[1.01] hover:border-blue-300 dark:hover:border-blue-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.25, duration: 0.4 }}
                >
                  {/* Spotlight effect and grid background */}
                  <Spotlight
                    className="bg-blue-100/75 dark:bg-blue-950/40 blur-xl"
                    size={64}
                  />
                  <div className="absolute inset-0">
                    <svg className="h-full w-full">
                      <defs>
                        <pattern
                          id={`grid-pattern-${blog.slug}`}
                          width="8"
                          height="8"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            xmlns="http://www.w3.org/2000/svg"
                            d="M0 4H4M4 4V0M4 4H8M4 4V8"
                            stroke="currentColor"
                            strokeOpacity="0.3"
                            className="stroke-white dark:stroke-neutral-950"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="2"
                            height="2"
                            fill="currentColor"
                            fillOpacity="0.25"
                            className="fill-white dark:fill-neutral-950"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#grid-pattern-${blog.slug})`}
                      />
                    </svg>
                  </div>

                  {/* Blog content */}
                  <div className="flex-1 relative z-10">
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

                  <div className="flex items-center justify-end relative z-10">
                    <motion.div
                      className="p-2 rounded-full bg-primary/10 text-primary group-hover:translate-x-1 transition-transform duration-300"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ArrowRightIcon size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            )
          })
        )}
      </div>
    </section>
  )
}

export default AllBlogs
