"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/motion-primitives/text-effect"
import { TextLoop } from "../motion-primitives/text-loop"

const Footer = () => {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  // Only show the theme switcher after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const themeOptions = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ]
  if (!mounted) return null

  return (
    <footer className="w-full border-t border-border/40 py-4 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          <TextLoop
            interval={3}
            className="overflow-y-clip"
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 80,
              mass: 10,
            }}
            variants={{
              initial: {
                y: 20,
                rotateX: 90,
                opacity: 0,
                filter: "blur(4px)",
              },
              animate: {
                y: 0,
                rotateX: 0,
                opacity: 1,
                filter: "blur(0px)",
              },
              exit: {
                y: -20,
                rotateX: -90,
                opacity: 0,
                filter: "blur(4px)",
              },
            }}
          >
            {/* add copyright and year and my name "Jacob Owens" */}
            <span>© {new Date().getFullYear()} Jacob Owens</span>
            <span>
              Check out my{" "}
              <a
                href="https://github.com/BuckyMcYolo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                GitHub
              </a>
            </span>
          </TextLoop>
        </div>

        <div className="flex items-center bg-muted/40 rounded-full p-1">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const isActive = theme === option.value

            return (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "relative flex items-center justify-center h-8 w-8 rounded-full cursor-pointer",
                  "text-muted-foreground hover:text-foreground transition-colors"
                )}
                aria-label={`Switch to ${option.label} theme`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 bg-background rounded-full shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <Icon
                  size={16}
                  className={cn(
                    "relative z-10",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
