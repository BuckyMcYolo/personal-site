"use client"

import React, { useState } from "react"
import {
  ArrowRight,
  Code2,
  Database,
  Github,
  Instagram,
  Linkedin,
  Layout,
  Wind,
  Layers,
  Box,
  Cpu,
  Server,
  PenTool,
  ToggleLeft,
  Twitter,
  Brain,
  Sparkles,
  MessageSquare,
  Image,
  Cloud,
  ImageIcon,
  BarChart,
  Rocket,
  Lightbulb,
  Palette,
} from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const Stack = () => {
  const [backendVariant, setBackendVariant] = useState("Server")
  const [databaseVariant, setDatabaseVariant] = useState("Postgres")

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
            { name: "React", icon: <Box className="h-4 w-4" /> },
            { name: "Next.js", icon: <Cpu className="h-4 w-4" /> },
            { name: "Tailwind CSS", icon: <Wind className="h-4 w-4" /> },
            { name: "Shadcn UI", icon: <Layers className="h-4 w-4" /> },
            { name: "Motion", icon: <PenTool className="h-4 w-4" /> },
            { name: "Lucide", icon: <Layout className="h-4 w-4" /> },
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
            { name: "Node.js", icon: <Cpu className="h-4 w-4" /> },
            { name: "Express", icon: <Wind className="h-4 w-4" /> },
            { name: "REST API", icon: <Box className="h-4 w-4" /> },
            { name: "JWT Auth", icon: <Layout className="h-4 w-4" /> },
          ],
        },
        {
          name: "Serverless",
          description: "Event-driven cloud computing with serverless functions",
          technologies: [
            { name: "Next.js API", icon: <Cpu className="h-4 w-4" /> },
            { name: "Vercel Edge", icon: <Cloud className="h-4 w-4" /> },
            { name: "Netlify Functions", icon: <Wind className="h-4 w-4" /> },
            { name: "tRPC", icon: <Box className="h-4 w-4" /> },
          ],
        },
      ],
      currentVariant: backendVariant,
      setVariant: setBackendVariant,
    },
    {
      title: "Database",
      icon: <Database className="h-5 w-5" />,
      description: "Storing and querying data efficiently",
      variants: [
        {
          name: "Postgres",
          description: "Powerful, open source object-relational database",
          technologies: [
            { name: "PostgreSQL", icon: <Database className="h-4 w-4" /> },
            { name: "Drizzle ORM", icon: <Box className="h-4 w-4" /> },
            { name: "SQL", icon: <Layout className="h-4 w-4" /> },
            { name: "pgAdmin", icon: <Layers className="h-4 w-4" /> },
          ],
        },
        {
          name: "MySQL",
          description: "Popular open-source relational database",
          technologies: [
            { name: "MySQL", icon: <Database className="h-4 w-4" /> },
            { name: "Prisma", icon: <Box className="h-4 w-4" /> },
            { name: "SQL", icon: <Layout className="h-4 w-4" /> },
            { name: "MySQL Workbench", icon: <Layers className="h-4 w-4" /> },
          ],
        },
      ],
      currentVariant: databaseVariant,
      setVariant: setDatabaseVariant,
    },
    {
      title: "AI",
      icon: <Brain className="h-5 w-5" />,
      description: "Integrating AI capabilities into applications",
      variants: [
        {
          name: "AI Tools",
          description:
            "Leveraging AI models and tools for intelligent applications",
          technologies: [
            { name: "OpenAI API", icon: <Sparkles className="h-4 w-4" /> },
            {
              name: "Anthropic Claude",
              icon: <MessageSquare className="h-4 w-4" />,
            },
            { name: "Hugging Face", icon: <Brain className="h-4 w-4" /> },
            { name: "LangChain", icon: <Layers className="h-4 w-4" /> },
            { name: "Replicate", icon: <ImageIcon className="h-4 w-4" /> },
            { name: "Vercel AI SDK", icon: <Cloud className="h-4 w-4" /> },
          ],
        },
      ],
      currentVariant: "AI Tools",
      setVariant: () => {},
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
