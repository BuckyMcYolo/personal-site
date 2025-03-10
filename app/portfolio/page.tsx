"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TextEffect } from "@/components/motion-primitives/text-effect"
import {
  ArrowUpRight,
  Code2,
  Globe,
  Smartphone,
  Brain,
  Layers,
  BadgeCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CategorySection } from "@/components/portfolio/category"

const PortfolioPage = () => {
  const categories = [
    {
      title: "Web Apps",
      icon: Code2,
      description: "Full-stack web applications built with modern technologies",
      projects: [
        {
          title: "Axon AI",
          description:
            "AI-powered practice management app for outpatient medical clinics",
          tags: [
            "Nextjs",
            "Postgres",
            "WebSockets",
            "Twilio",
            "Deepgram",
            "AWS",
          ],
          image: "/axon-ai-dashboard.png",
          link: "https://app.getaxon.ai/",
        },
      ],
    },
    {
      title: "Websites",
      icon: Globe,
      description:
        "Responsive websites with modern design and optimal performance",
      projects: [
        {
          title: "Axon AI Marketing",
          description:
            "Marketing Website for Axon AI with product information, intercom integration, and pricing",
          tags: [
            "Next.js",
            "React",
            "Tailwind CSS",
            "ShadCN UI",
            "Framer Motion",
          ],
          image: "/axon-ai-light.png",
          link: "https://www.getaxon.ai/",
        },
        {
          title: "Midsouth Neurology",
          description:
            "Medical website for a neurology clinic with referral portal and patient resources",
          tags: ["React", "Nextjs", "Tailwind CSS", "Shadcn UI"],
          image: "/midsouth-neurology.png",
          link: "https://midsouthneurology.com/",
        },
      ],
    },
    {
      title: "AI Projects",
      icon: Brain,
      description:
        "Applications leveraging artificial intelligence and machine learning",
      projects: [
        {
          title: "AI scribe",
          description:
            "Ambient listening tool for transcribing audio to notes in real-time",
          tags: ["Deepgram", "Claude", "React", "Websockets"],
          image: "/ai-scribe.png",
          link: "https://www.getaxon.ai/product/ai-scribe",
        },
        {
          title: "AI Hospital Chatbot",
          description: "Chatbot for hospital policy information.",
          tags: [
            "OpenAI",
            "React",
            "Pinecone DB",
            "Llama Index",
            "Vercel AI SDK",
          ],
          image: "/hospital-policy-chat.png",
          link: "/portfolio/customer-service",
        },
        {
          title: "AI Call Center Demo",
          description:
            "Demo application showcasing AI call center capabilities",
          tags: ["Elevenlabs", "OpenAI", "Twilio", "React", "Langchain"],
          image: "/demo-ai-call-center.png",
          link: "https://demo-app.getaxon.ai/",
        },
        {
          title: "ESP-32 AI voice agent",
          description: "ESP 32 agent for voice commands with AI processing",
          tags: ["ESP32", "C / C++", "Elevenlabs", "OpenAI"],
          image: "",
          link: "https://github.com/BuckyMcYolo/ESP32-voice-ai-agent",
        },
      ],
    },
    {
      title: "Servers & APIs",
      icon: Smartphone,
      description: "Backend servers, APIs, and microservices",
      projects: [
        {
          title: "AI Call Center Voice Server",
          description:
            "Express server for handling voice calls in real time with AI",
          tags: ["Twilio", "Express", "Elevenlabs", "OpenAI", "Railway"],
          image: "",
          link: "https://github.com/BuckyMcYolo/ai-call-center-voice-server",
        },
        {
          title: "WS Speech to Text Server",
          description:
            "Websocket server for converting speech to text in real-time",
          tags: ["Express", "Websockets", "Deepgram", "AWS"],
          image: "",
          link: "https://github.com/Digital-Healthcare-Solutions/voice-ws",
        },
      ],
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <div className="py-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-2">
            <BadgeCheck className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            <TextEffect per="word" preset="scale">
              My Portfolio
            </TextEffect>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            A collection of projects showcasing my skills in web development,
            mobile apps, AI integration, and more. Click on any project to view
            details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-16"
        >
          {categories.map((category) => (
            <CategorySection key={category.title} {...category} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioPage
