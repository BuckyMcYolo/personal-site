"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, FileText } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
  isMobile?: boolean
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  className = "",
  isMobile = false,
}) => {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [collapsed, setCollapsed] = useState(false)
  const [stickyNav, setStickyNav] = useState(false)

  // Find all headings and set up intersection observer
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3, article h4")
    )
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.substring(1)),
      }))

    setHeadings(elements)

    // Observer for detecting active section
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    elements.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Add scroll listener for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setStickyNav(true)
      } else {
        setStickyNav(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveId(id)
    }
  }

  if (headings.length === 0) {
    return null
  }

  // Mobile version of TOC
  if (isMobile) {
    return (
      <nav className="space-y-1 text-sm">
        {headings.map((heading) => (
          <div
            key={heading.id}
            className={`
              ${heading.level === 2 ? "" : "ml-3"} 
              ${heading.level === 4 ? "ml-6" : ""}
            `}
          >
            <button
              onClick={() => scrollToSection(heading.id)}
              className={`flex items-center w-full px-3 py-2 text-xs rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
                activeId === heading.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-neutral-700 dark:text-neutral-300"
              }`}
            >
              {heading.text}
            </button>
          </div>
        ))}
      </nav>
    )
  }

  // Desktop version of TOC
  return (
    <div
      className={`fixed z-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        stickyNav ? "top-4" : "top-64"
      } ${collapsed ? "w-12" : "w-64"} ${className}`}
    >
      {/* Header with collapse button */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-neutral-200 dark:border-neutral-700">
        {!collapsed && (
          <h2 className="text-sm font-bold flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Contents
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 ml-auto cursor-pointer"
          aria-label={
            collapsed
              ? "Expand table of contents"
              : "Collapse table of contents"
          }
          title={
            collapsed
              ? "Expand table of contents"
              : "Collapse table of contents"
          }
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`flex-1 overflow-y-auto max-h-[70vh] ${
          collapsed ? "p-2" : "p-3"
        }`}
      >
        <ul className="space-y-1">
          {headings.map((heading, index) => (
            <li
              key={heading.id}
              className={`
                ${heading.level === 2 ? "" : collapsed ? "" : "ml-3"} 
                ${heading.level === 4 ? (collapsed ? "" : "ml-6") : ""}
              `}
            >
              <button
                onClick={() => scrollToSection(heading.id)}
                className={`flex items-center w-full rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
                  collapsed ? "justify-center p-2" : "px-3 py-2 text-xs"
                } ${
                  activeId === heading.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
                aria-label={heading.text}
                title={heading.text}
              >
                {collapsed ? (
                  <span className="text-xs font-medium">H{index + 1}</span>
                ) : (
                  <span className="text-left line-clamp-1">{heading.text}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents
