"use client"

import React from "react"
import { TextEffect } from "../motion-primitives/text-effect"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const TabSelector = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const routes = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
  ]

  return (
    <div className="w-full max-w-4xl px-4">
      <header className="py-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-4 sm:mb-0">
            <TextEffect per="char" preset="fade">
              Jacob Owens
            </TextEffect>
          </h1>

          <nav className="flex gap-6">
            {routes.map((route) => {
              const isActive = pathname === route.path

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "relative px-1 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {isActive ? (
                    <>
                      <TextEffect per="char" preset="scale">
                        {route.label}
                      </TextEffect>
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    </>
                  ) : (
                    route.label
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="pb-12">{children}</main>
    </div>
  )
}

export default TabSelector
