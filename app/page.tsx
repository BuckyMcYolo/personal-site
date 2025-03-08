"use client"

import React, { useState } from "react"
import { TextEffect } from "@/components/motion-primitives/text-effect"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
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
import Link from "next/link"
import { Magnetic } from "@/components/motion-primitives/magnetic"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BorderTrail } from "@/components/motion-primitives/border-trail"

export default function Home() {
  const [backendVariant, setBackendVariant] = useState("Server")
  const [databaseVariant, setDatabaseVariant] = useState("Postgres")

  const services = [
    {
      title: "Design",
      icon: <Palette className="h-5 w-5" />,
      description:
        "Creating intuitive and beautiful user interfaces that focus on the user experience.",
    },
    {
      title: "Development",
      icon: <Code2 className="h-5 w-5" />,
      description:
        "Building fast, responsive websites and applications using modern technologies.",
    },
    {
      title: "Strategy",
      icon: <Lightbulb className="h-5 w-5" />,
      description:
        "Helping brands and businesses create meaningful digital experiences.",
    },
  ]

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
    <div className="space-y-12">
      <section className="space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextEffect
            per="word"
            preset="fade"
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Hi, Im Jacob Owens
          </TextEffect>
        </motion.div>

        <motion.p
          className="text-xl text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Designer, developer, and creative thinker focused on building
          beautiful digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button
            asChild
            size="lg"
            className="group duration-300 ease-in-out transition"
          >
            <Link href="/portfolio">
              View my work
              <ArrowRight
                className={`h-4 w-4 group-hover:translate-x-1 transition`}
              />
            </Link>
          </Button>
          <div className="relative">
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
              mode="colorShift"
              blur="soft"
              duration={3}
              scale={0.8}
            />
            <Button variant="outline" size="lg" asChild className="relative">
              <Link href="/blog">Read my blog</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <motion.div
        className="h-px w-full bg-border"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Rocket className="h-5 w-5 text-primary" />
        </div>

        <TextEffect
          per="word"
          preset="fade"
          className="text-3xl font-bold tracking-tight"
        >
          Full Stack Engineer & Startup Founder
        </TextEffect>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I specialize in building complete web applications from concept to
          deployment. With expertise across the entire stack, I love creating
          innovative solutions for startups and businesses.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart className="h-6 w-6" />
          <h2 className="text-2xl font-bold tracking-tight">What I Do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden group"
            >
              <BorderTrail
                style={{
                  boxShadow:
                    "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                }}
                size={100}
                className="hidden group-hover:block absolute"
              />
              <div className="space-y-3 p-6 bg-muted/30 rounded-lg border border-border/40">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <span className="text-primary">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      <motion.section
        className="py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-2xl">Recent Blog posts</h2>
        <section className="grid grid-cols-1 gap-3 pt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="cursor-pointer hover:bg-accent/70">
              <CardHeader>
                <CardTitle>How to build a blog with Next.js and MDX</CardTitle>
                <CardDescription>
                  <span className="text-muted-foreground">Published on</span>
                  <span className="text-muted-foreground">June 12, 2021</span>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </motion.section>
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
      <motion.section
        className="py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <h2 className="text-2xl">Connect with me</h2>
        <p className="text-muted-foreground pt-1">
          Feel free to email me at{" "}
          <a
            className="underline text-primary"
            href="mailto:jacobowens75@gmail.com"
          >
            jacobowens75@gmail.com
          </a>
        </p>
        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 pt-4">
          <Magnetic intensity={0.75} range={50} actionArea="global">
            <Button variant={"secondary"}>
              <Twitter className="h-6 w-6" />
              Twitter
            </Button>
          </Magnetic>
          <Magnetic intensity={0.75} range={50} actionArea="global">
            <Button variant={"secondary"}>
              <Github className="h-6 w-6" />
              Github
            </Button>
          </Magnetic>
          <Magnetic intensity={0.75} range={50} actionArea="global">
            <Button variant={"secondary"}>
              <Instagram className="h-6 w-6" />
              Instagram
            </Button>
          </Magnetic>
          <Magnetic intensity={0.5} range={50} actionArea="global">
            <Button variant={"secondary"}>
              <Linkedin className="h-6 w-6" />
              LinkedIn
            </Button>
          </Magnetic>
        </div>
      </motion.section>
    </div>
  )
}
