"use client"

import React, { useEffect, useRef, useState } from "react"
import useMeasure from "react-use-measure"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { Send, Maximize2, MessageCircle, Minimize2, X } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import useClickOutside from "../motion-primitives/useClickOutside"

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm an AI assistant that can tell you about my creator's background, resume, and projects. What would you like to know?",
    },
  ])

  const ref = useRef<HTMLDivElement>(null!)

  // Close chat when clicking outside
  useClickOutside(ref, () => {
    setIsOpen(false)
  })

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

  // Simulate AI responses based on user input
  const getAIResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase()

    if (
      lowerCaseMessage.includes("background") ||
      lowerCaseMessage.includes("about")
    ) {
      return "I'm a software engineer specializing in full-stack development with expertise in React, Next.js, Node.js, and Python. I've been coding professionally for over 5 years and love building intuitive, performant web applications."
    } else if (
      lowerCaseMessage.includes("resume") ||
      lowerCaseMessage.includes("experience")
    ) {
      return "My professional experience includes working at tech startups and as a freelancer. I've built e-commerce platforms, SaaS applications, and data visualization tools. My strongest skills are in frontend development with React and building scalable backend systems."
    } else if (
      lowerCaseMessage.includes("project") ||
      lowerCaseMessage.includes("work")
    ) {
      return "Some of my recent projects include an e-commerce platform built with Next.js, a real-time analytics dashboard using React and D3, and a content management system with a Node.js backend. You can see more details in the Projects section of this site!"
    } else if (
      lowerCaseMessage.includes("contact") ||
      lowerCaseMessage.includes("hire")
    ) {
      return "You can contact me via email at example@domain.com or through the contact form on this site. I'm currently available for freelance work and interested in discussing new opportunities."
    } else {
      return "I'd be happy to tell you more about my creator's background, resume, projects, or how to get in touch. Just let me know what you're interested in!"
    }
  }

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const userMessage = { role: "user", content: message }

      // Get AI response
      const aiResponse = { role: "assistant", content: getAIResponse(message) }

      // Update messages state with both messages
      setMessages([...messages, userMessage, aiResponse])

      // Clear input
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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
                className={"absolute bottom-0 right-0 mb-2"}
                style={{
                  width:
                    screenWidth > 420
                      ? Math.min(420, screenWidth)
                      : screenWidth - 40,
                }}
              >
                <div className="shadow-lg overflow-hidden border border-zinc-950/10 dark:border-neutral-900 py-0 bg-white dark:bg-black rounded-lg">
                  <div className="bg-neutral-100 dark:bg-primary/10 py-2 px-4 border-b border-neutral-200 dark:border-neutral-900">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium">Ask AI about me</div>
                    </div>
                  </div>

                  <motion.div>
                    <ScrollArea
                      className={cn(`px-4 py-2`, "h-[25.5rem]")}
                      type="auto"
                    >
                      <div className="space-y-4 pb-3">
                        {messages.map((msg, index) => (
                          <motion.div
                            key={index}
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
                              className={`flex items-start max-w-[80%] ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              } rounded-lg px-3 py-2`}
                            >
                              {msg.role === "assistant" && (
                                <Avatar className="h-6 w-6 mr-2 mt-1">
                                  <MessageCircle className="h-4 w-4" />
                                </Avatar>
                              )}
                              <div>
                                <p
                                  className={`text-sm ${
                                    msg.role === "user"
                                      ? "text-primary-foreground"
                                      : ""
                                  }`}
                                >
                                  {msg.content}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </motion.div>

                  <div className="p-3 border-t">
                    <div className="flex w-full items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg pr-3">
                      <Textarea
                        placeholder="Ask me anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-4 max-h-16 h-fit"
                        variant="filled"
                      />
                      <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!message.trim()}
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
            className="size-12 rounded-full shadow-lg bg-white border border-neutral-300 dark:border-0 dark:bg-neutral-800"
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
