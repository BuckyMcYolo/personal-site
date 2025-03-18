"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, MotionConfig, view } from "framer-motion"
import {
  Send,
  MessageCircle,
  X,
  ChevronsUpDown,
  LinkIcon,
  FileIcon,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import useClickOutside from "../motion-primitives/useClickOutside"
import { useChat } from "@ai-sdk/react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import CodeBlock from "../mdx/CodeBlock"

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [sourceIndexExpanded, setSourceIndexExpanded] = useState<
    number[] | null
  >(null)

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "assistant",
        content:
          "Hello! I can tell you more about Jacob's background or book a meeting. How can I assist you?",
        id: "1",
      },
    ],
    maxSteps: 3,
  })

  const ref = useRef<HTMLDivElement>(null!)

  // Close chat when clicking outside
  // useClickOutside(ref, () => {
  //   setIsOpen(false)
  // })

  useEffect(() => {
    if (window) {
      setScreenWidth(window.innerWidth)

      window.addEventListener("resize", () => {
        setScreenWidth(window.innerWidth)
      })

      return () => {
        window.removeEventListener("resize", () => {
          setScreenWidth(window.innerWidth)
        })
      }
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const viewportRef = useRef<HTMLDivElement>(null)

  //scroll to bottom
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && viewportRef.current) {
      viewportRef.current.scrollIntoView({
        behavior: "instant",
        block: "end",
      })
    }
  }, [isOpen])

  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.1,
        duration: 0.25,
      }}
    >
      <div className="fixed bottom-4 right-4 z-50" ref={ref}>
        <div className="relative">
          <AnimatePresence initial={false} mode="wait">
            {isOpen && (
              <motion.div
                key="chat-panel"
                initial={{ opacity: 0, scale: 0.75, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, y: 20 }}
                className={cn("absolute bottom-0 right-0 mb-2")}
                style={{
                  width:
                    screenWidth > 420
                      ? Math.min(420, screenWidth)
                      : screenWidth - 40,
                }}
              >
                <div className="shadow-lg border border-zinc-950/10 dark:border-neutral-900 py-0 bg-white dark:bg-black rounded-lg">
                  <div className="bg-neutral-100 dark:bg-primary/10 py-2 px-4 border-b border-neutral-200 dark:border-neutral-900 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium">Ask AI about me</div>
                    </div>
                  </div>

                  <motion.div>
                    <div
                      className={cn(
                        "relative px-4 py-2 h-[25.5rem] overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-neutral-400 dark:scrollbar-track-black dark:scrollbar-thumb-neutral-800"
                      )}
                    >
                      <div className="space-y-4 pb-3 pt-2">
                        {messages.map((msg, index) => (
                          <div key={index} className="space-y-2">
                            <motion.div
                              className={`flex ${
                                msg.role === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * (index % 2) }}
                            >
                              <div
                                className={`flex items-start ${
                                  msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                } rounded-lg px-3 py-2`}
                                style={{
                                  maxWidth: "100%",
                                  width: "auto",
                                }}
                              >
                                {msg.role === "assistant" && (
                                  <Avatar className="h-6 w-6 mr-2 mt-1 flex-shrink-0">
                                    <MessageCircle className="h-4 w-4" />
                                  </Avatar>
                                )}
                                <div className="min-w-0 max-w-full overflow-hidden flex-1">
                                  <div
                                    className={`text-sm ${
                                      msg.role === "user"
                                        ? "text-primary-foreground"
                                        : ""
                                    } break-words overflow-hidden max-w-full`}
                                  >
                                    <Markdown
                                      remarkPlugins={[remarkGfm]}
                                      rehypePlugins={[rehypeRaw]}
                                      components={{
                                        code: ({
                                          className,
                                          children,
                                          ...props
                                        }) => {
                                          const match = /language-(\w+)/.exec(
                                            className || ""
                                          )
                                          const language = match ? match[1] : ""
                                          const inline =
                                            !className?.includes("language-")

                                          if (inline) {
                                            return (
                                              <code
                                                className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-sm"
                                                {...props}
                                              >
                                                {children}
                                              </code>
                                            )
                                          }

                                          return (
                                            <div className="max-w-full overflow-hidden">
                                              <CodeBlock className={className}>
                                                {String(children).replace(
                                                  /\n$/,
                                                  ""
                                                )}
                                              </CodeBlock>
                                            </div>
                                          )
                                        },

                                        p({ children, ...props }) {
                                          return (
                                            <p
                                              className="break-words"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </p>
                                          )
                                        },

                                        // Custom heading components
                                        h2({ children, ...props }) {
                                          return (
                                            <h2
                                              className="text-lg font-semibold mt-2 mb-1"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </h2>
                                          )
                                        },
                                        h3({ children, ...props }) {
                                          return (
                                            <h3
                                              className="text-base font-medium mt-2 mb-1"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </h3>
                                          )
                                        },
                                        h4({ children, ...props }) {
                                          return (
                                            <h4
                                              className="text-sm font-medium mt-1 mb-1"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </h4>
                                          )
                                        },
                                        // Add more custom components as needed
                                        a({ href, children, ...props }) {
                                          return (
                                            <a
                                              href={href}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 dark:text-blue-400 hover:underline"
                                              style={{ wordBreak: "break-all" }}
                                              {...props}
                                            >
                                              {children}
                                            </a>
                                          )
                                        },
                                        ul({ children, ...props }) {
                                          return (
                                            <ul
                                              className="list-disc list-inside pl-1 my-1"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </ul>
                                          )
                                        },
                                        ol({ children, ...props }) {
                                          return (
                                            <ol
                                              className="list-decimal list-inside pl-1 my-1"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </ol>
                                          )
                                        },
                                        blockquote({ children, ...props }) {
                                          return (
                                            <blockquote
                                              className="border-l-2 border-primary pl-3 italic my-1"
                                              style={{
                                                overflowWrap: "break-word",
                                                wordBreak: "break-word",
                                              }}
                                              {...props}
                                            >
                                              {children}
                                            </blockquote>
                                          )
                                        },
                                      }}
                                    >
                                      {msg.content}
                                    </Markdown>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                            {msg.parts.map((part, partIndex) => {
                              if (part.type === "tool-invocation") {
                                if (
                                  part.toolInvocation.toolName ===
                                    "getResumeDetails" &&
                                  part.toolInvocation.state === "result"
                                ) {
                                  return (
                                    <div
                                      key={partIndex}
                                      className="w-full mt-2"
                                    >
                                      <div
                                        className="flex items-center justify-between gap-2 bg-muted rounded-md px-4 py-2.5 w-1/2 border-l-4 border-blue-500 shadow-sm cursor-pointer hover:bg-muted/80 transition-all duration-200"
                                        onClick={() => {
                                          setSourceIndexExpanded((prev) =>
                                            prev?.includes(index)
                                              ? prev.filter((i) => i !== index)
                                              : [...(prev || []), index]
                                          )
                                        }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <FileIcon
                                            size={14}
                                            className="text-blue-500"
                                          />
                                          <div className="text-sm font-medium">
                                            Sources
                                          </div>
                                        </div>
                                        <div className="text-muted-foreground">
                                          <ChevronsUpDown size={14} />
                                        </div>
                                      </div>

                                      {sourceIndexExpanded?.includes(index) &&
                                        part.toolInvocation.state ===
                                          "result" && (
                                          <div className="w-1/2 rounded-md bg-muted/50 p-3 mt-1 border border-muted-foreground/10 shadow-sm">
                                            <div className="space-y-2">
                                              {part.toolInvocation?.result.map(
                                                (
                                                  res: {
                                                    content: string
                                                    title: string
                                                    source: string
                                                  },
                                                  idx: number
                                                ) => (
                                                  <div
                                                    key={idx}
                                                    className="flex items-start gap-2 py-1 px-1 hover:bg-muted/80 rounded-sm transition-colors"
                                                  >
                                                    <LinkIcon
                                                      size={14}
                                                      className="text-blue-500 mt-0.5 flex-shrink-0"
                                                    />
                                                    <a
                                                      href={res.source}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
                                                    >
                                                      {res.title ||
                                                        "Source Document"}
                                                    </a>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                  )
                                }
                              }
                            })}
                          </div>
                        ))}
                      </div>
                      <div ref={viewportRef} />
                    </div>
                  </motion.div>

                  <div className="p-3 border-t">
                    <div className="flex w-full items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg pr-3">
                      <Textarea
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="min-h-4 max-h-16 h-fit"
                        variant="filled"
                        autoFocus
                      />
                      <Button
                        size="icon"
                        onClick={handleSubmit}
                        disabled={!input.trim()}
                        variant={"ghost"}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      >
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="size-12 rounded-full shadow-lg bg-black hover:bg-black text-white dark:bg-neutral-800"
            onClick={() => setIsOpen(!isOpen)}
            variant={"secondary"}
            size="icon"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="size-5" />
              ) : (
                <MessageCircle className="size-5" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
