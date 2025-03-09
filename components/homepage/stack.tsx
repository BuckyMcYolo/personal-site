"use client"

import React, { useState } from "react"
import {
  Code2,
  Database,
  Layout,
  Wind,
  Layers,
  Box,
  Cpu,
  Server,
  PenTool,
  Brain,
  Sparkles,
  MessageSquare,
  Cloud,
  ImageIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  SiAmazonapigateway,
  SiAmazonec2,
  SiAmazonrds,
  SiAmazons3,
  SiDrizzle,
  SiExpress,
  SiFlydotio,
  SiHuggingface,
  SiLangchain,
  SiLucide,
  SiMysql,
  SiNetlify,
  SiPostgresql,
  SiPrisma,
  SiRailway,
  SiShadcnui,
  SiVercel,
} from "react-icons/si"
import { PiOpenAiLogo, PiVectorThreeBold } from "react-icons/pi"
import {
  RiAnthropicFill,
  RiNextjsLine,
  RiTailwindCssFill,
  RiVercelFill,
} from "react-icons/ri"
import { FaNodeJs, FaReact } from "react-icons/fa"

const Stack = () => {
  const [backendVariant, setBackendVariant] = useState("Server")
  const [hostingVariant, setHostingVariant] = useState("AWS")

  const stackCategories = [
    {
      title: "Frontend",
      icon: <Layout className="h-5 w-5" />,
      description: "Building responsive, performant user interfaces with React",
      variants: [
        {
          name: "React",
          description: "Component-based UI library for interactive interfaces",
          technologies: [
            { name: "React", icon: <FaReact className="h-4 w-4" /> },
            { name: "Next.js", icon: <RiNextjsLine className="h-4 w-4" /> },
            {
              name: "Tailwind CSS",
              icon: <RiTailwindCssFill className="h-4 w-4" />,
            },
            { name: "Shadcn UI", icon: <SiShadcnui className="h-4 w-4" /> },
            { name: "Lucide Icons", icon: <SiLucide className="h-4 w-4" /> },
          ],
        },
      ],
      currentVariant: "React",
      setVariant: () => {}, // No toggle needed for frontend
    },
    {
      title: "Backend",
      icon: <Server className="h-5 w-5" />,
      description: "Building APIs and server-side applications",
      variants: [
        {
          name: "Server",
          description: "Traditional server-based architecture with Express",
          technologies: [
            { name: "Node.js", icon: <FaNodeJs className="h-4 w-4" /> },
            { name: "Express", icon: <SiExpress className="h-4 w-4" /> },
            { name: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4" /> },
            { name: "Drizzle ORM", icon: <SiDrizzle className="h-4 w-4" /> },
          ],
        },
        {
          name: "Serverless",
          description: "Event-driven cloud computing with serverless functions",
          technologies: [
            { name: "Next.js API", icon: <RiNextjsLine className="h-4 w-4" /> },
            { name: "Vercel Edge", icon: <RiVercelFill className="h-4 w-4" /> },
            { name: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4" /> },
            { name: "Drizzle ORM", icon: <SiDrizzle className="h-4 w-4" /> },
          ],
        },
      ],
      currentVariant: backendVariant,
      setVariant: setBackendVariant,
    },

    {
      title: "AI Tools",
      icon: <Brain className="h-5 w-5" />,
      description: "Integrating AI capabilities into applications",
      variants: [
        {
          name: "AI Tools",
          description:
            "Leveraging AI models and tools for intelligent applications",
          technologies: [
            { name: "OpenAI API", icon: <PiOpenAiLogo className="h-4 w-4" /> },
            {
              name: "Anthropic Claude",
              icon: <RiAnthropicFill className="h-4 w-4" />,
            },
            {
              name: "Hugging Face",
              icon: <SiHuggingface className="h-4 w-4" />,
            },
            { name: "LangChain", icon: <SiLangchain className="h-4 w-4" /> },

            {
              name: "Vercel AI SDK",
              icon: <RiVercelFill className="h-4 w-4" />,
            },
          ],
        },
      ],
      currentVariant: "AI Tools",
      setVariant: () => {},
    },
    {
      title: "Hosting",
      icon: <Cloud className="h-5 w-5" />,
      description: "Deploying applications to the cloud",
      variants: [
        {
          name: "AWS",
          description:
            "Comprehensive cloud services with global infrastructure",
          technologies: [
            { name: "EC2", icon: <SiAmazonec2 className="h-4 w-4" /> },
            { name: "S3", icon: <SiAmazons3 className="h-4 w-4" /> },
            {
              name: "Lambda",
              icon: <SiAmazonapigateway className="h-4 w-4" />,
            },
            { name: "RDS", icon: <SiAmazonrds className="h-4 w-4" /> },
          ],
        },

        {
          name: "Alternative",
          description: "Modern developer-friendly deployment platforms",
          technologies: [
            { name: "Vercel", icon: <SiVercel className="h-4 w-4" /> },
            { name: "Netlify", icon: <SiNetlify className="h-4 w-4" /> },
            { name: "Railway", icon: <SiRailway className="h-4 w-4" /> },
            { name: "Fly.io", icon: <SiFlydotio className="h-4 w-4" /> },
          ],
        },
      ],
      currentVariant: hostingVariant,
      setVariant: setHostingVariant,
    },
  ]
  return (
    <motion.section
      className="py-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
    >
      <div className="space-y-8">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="h-6 w-6" />
          <h2 className="text-2xl font-bold tracking-tight">My Tech Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {stackCategories.map((category, categoryIndex) => {
            // Find the currently selected variant
            const activeVariant = category.variants.find(
              (v) => v.name === category.currentVariant
            )

            return (
              <motion.div
                key={category.title}
                className="bg-muted/40 rounded-lg p-6 border border-border/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.1 + categoryIndex * 0.2,
                  duration: 0.4,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {category.icon}
                  <h3 className="text-lg font-medium">{category.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>

                {/* Variant Switcher (only show if there's more than one variant) */}
                {category.variants.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.variants.map((variant) => (
                      <Badge
                        key={variant.name}
                        variant={
                          variant.name === category.currentVariant
                            ? "default"
                            : "outline"
                        }
                        className={cn(
                          "cursor-pointer",
                          variant.name === category.currentVariant
                            ? "bg-primary"
                            : "hover:bg-muted"
                        )}
                        onClick={() => category.setVariant(variant.name)}
                      >
                        {variant.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Variant Description */}
                <p className="text-xs text-muted-foreground mb-4 italic">
                  {activeVariant?.description}
                </p>

                {/* Technology Pills */}
                <div className="grid grid-cols-2 gap-2">
                  {activeVariant?.technologies.map((tech) => (
                    <motion.div
                      key={tech.name}
                      className="flex items-center gap-2 bg-background p-2 rounded border border-border/60"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <span className="text-primary">{tech.icon}</span>
                      <span className="text-sm font-medium">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default Stack
