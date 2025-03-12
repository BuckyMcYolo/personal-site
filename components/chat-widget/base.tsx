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

// Animation transition settings
const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm an AI assistant that can tell you about my creator's background, resume, and projects. What would you like to know?",
    },
  ])

  const ref = useRef<HTMLDivElement>(null!)
  const [contentRef, { height: contentHeight }] = useMeasure()
  const [containerRef, { width: containerWidth }] = useMeasure()
  const [maxWidth, setMaxWidth] = useState(0)

  // Close chat when clicking outside
  useClickOutside(ref, () => {
    setIsOpen(false)
  })

  // Set max width based on container width
  useEffect(() => {
    if (!containerWidth || maxWidth > 0) return
    setMaxWidth(containerWidth)
  }, [containerWidth, maxWidth])

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
    <MotionConfig transition={transition}>
      <div className="fixed bottom-4 right-4 z-50" ref={ref}>
        <div className="relative">
          <AnimatePresence initial={false} mode="sync">
            {isOpen && (
              <motion.div
                key="chat-panel"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-0 right-0 mb-2"
                style={{
                  width: isExpanded ? Math.max(420, maxWidth) : 320,
                }}
              >
                <Card className="shadow-lg overflow-hidden border border-zinc-950/10 dark:border-neutral-700 py-0">
                  <CardHeader className="bg-primary/10 py-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        Chat with AI Assistant
                      </CardTitle>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="h-8 w-8"
                        >
                          {isExpanded ? (
                            <Minimize2 className="h-4 w-4" />
                          ) : (
                            <Maximize2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <motion.div
                    animate={{ height: isExpanded ? 400 : 240 }}
                    transition={{ ...transition, duration: 0.2 }}
                  >
                    <CardContent className="p-0">
                      <ScrollArea className="h-60 px-4 py-2">
                        <div className="space-y-4" ref={contentRef}>
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
                    </CardContent>
                  </motion.div>

                  <CardFooter className="p-3 border-t">
                    <div className="flex w-full items-center space-x-2 bg-background dark:bg-neutral-900 rounded-lg pr-3">
                      <Textarea
                        placeholder="Ask me anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1"
                        variant="filled"
                      />
                      <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!message.trim()}
                        variant={"ghost"}
                      >
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          ref={containerRef}
        >
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
