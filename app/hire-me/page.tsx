"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  Code,
  FileText,
  Laptop,
  Mail,
  MessageSquare,
  Clock,
  Rocket,
  Calendar,
  CheckCircle,
  Zap,
  DollarSign,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextEffect } from "@/components/motion-primitives/text-effect"
import { BorderTrail } from "@/components/motion-primitives/border-trail"
import { Server, Brain } from "lucide-react"
import { Spotlight } from "@/components/motion-primitives/spotlight"
import { Tilt } from "@/components/motion-primitives/tilt"
import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import { TextScramble } from "@/components/motion-primitives/text-scramble"

const HireMePage = () => {
  const [activeTab, setActiveTab] = useState<"freelance" | "engineer">(
    "engineer"
  )

  async function downloadResume() {
    const res = await fetch("/resume.pdf")
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Jacob Owens Resume.pdf"
    a.click()
  }

  const freelanceServices = [
    {
      title: "Web Development",
      icon: <Code className="h-5 w-5" />,
      description:
        "Custom websites and web applications built with React, Next.js, and modern backend technologies.",
    },
    {
      title: "Technical Consultation",
      icon: <Laptop className="h-5 w-5" />,
      description:
        "Expert advice on technology stack, architecture decisions, and implementation strategies.",
    },
    {
      title: "AI Integration",
      icon: <Zap className="h-5 w-5" />,
      description:
        "Implementing AI capabilities into applications using OpenAI, Claude, and other modern AI tools.",
    },
  ]

  const softwareEngineerSkills = [
    {
      title: "Frontend Development",
      icon: <Code className="h-5 w-5" />,
      description:
        "Building responsive, performant user interfaces with React, Next.js, and Tailwind CSS.",
    },
    {
      title: "Backend Systems",
      icon: <Server className="h-5 w-5" />,
      description:
        "Developing robust server-side applications with Node.js, Express, and PostgreSQL.",
    },
    {
      title: "AI & ML Integration",
      icon: <Brain className="h-5 w-5" />,
      description:
        "Leveraging AI models and tools for intelligent applications using Agents, Vector databases, and AI tooling.",
    },
  ]

  const freelanceProcess = [
    {
      title: "Discovery",
      description:
        "We'll discuss your project requirements, goals, and expectations to ensure alignment.",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Proposal",
      description:
        "I'll provide a detailed proposal including timeline, deliverables, and cost estimate.",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Development",
      description:
        "Iterative development with regular check-ins and progress updates.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Delivery",
      description:
        "Final delivery, deployment assistance, and knowledge transfer.",
      icon: <Rocket className="h-6 w-6" />,
    },
  ]

  const engineerHighlights = [
    {
      title: "3+ Years Experience",
      description:
        "Working with modern web technologies in various business domains.",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Full Stack Expertise",
      description:
        "Proficient in both frontend and backend development, with a strong emphasis on quality code.",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Startup Founder",
      description:
        "Experience building products from concept to market, with a focus on MVPs and rapid iteration.",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Problem Solver",
      description:
        "Ability to tackle complex technical challenges and deliver efficient, scalable solutions.",
      icon: <Zap className="h-6 w-6" />,
    },
  ]

  const tabContent = {
    freelance: (
      <motion.div
        key="freelance"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-12"
      >
        <section className="space-y-6">
          <TextScramble
            className="text-3xl font-bold tracking-tight"
            duration={0.5}
            characterSet=". "
          >
            Freelance Services
          </TextScramble>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            transition={{ delay: 0.1, duration: 0.5 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            I provide specialized freelance services for businesses and startups
            looking to build innovative digital products. My approach focuses on
            quality, communication, and delivering impactful solutions that
            align with your business objectives.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {freelanceServices.map((service, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30"
              >
                <Spotlight className="bg-blue-500 blur-2xl" size={200} />
                <div className="relative h-full w-full rounded-xl bg-neutral-50 dark:bg-neutral-900">
                  <div className="space-y-3 p-6 rounded-lg ">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                      <span className="text-primary">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <motion.div
          className="h-px w-full bg-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />

        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-6 w-6" />
            <h2 className="text-2xl font-bold tracking-tight">My Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freelanceProcess.map((step, index) => (
              <Tilt rotationFactor={12} isRevese key={index} className="h-full">
                <motion.div
                  className="bg-muted/40 rounded-lg p-6 border border-border/40 h-full hover:border-neutral-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary">{step.icon}</span>
                    <h3 className="text-lg font-medium">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <TextEffect
            per="word"
            preset="fade"
            className="text-3xl font-bold tracking-tight"
          >
            Pricing Structure
          </TextEffect>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.98}
              />
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-border/40 relative">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hourly Rate</h3>
                <p className="text-muted-foreground mb-4">
                  For smaller tasks and ongoing support.
                </p>
                <p className="text-3xl font-bold">
                  $70-100
                  <span className="text-sm font-normal text-muted-foreground">
                    /hour
                  </span>
                </p>
              </div>{" "}
            </div>

            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.98}
              />
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 border border-primary/30 relative">
                <Badge className="absolute top-4 right-4">Recommended</Badge>
                <div className="inline-flex items-center justify-center p-2 bg-primary/20 rounded-full mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Project-Based</h3>
                <p className="text-muted-foreground mb-4">
                  Fixed scope with defined deliverables.
                </p>
                <p className="text-3xl font-bold">
                  Custom
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    quote
                  </span>
                </p>
              </div>
            </div>

            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.98}
              />
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-border/40 relative">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Retainer</h3>
                <p className="text-muted-foreground mb-4">
                  Ongoing development and maintenance.
                </p>
                <p className="text-3xl font-bold">
                  $1,000+
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center gap-4 pt-8">
          <a href="mailto:jacobowens75@gmail.com" className="flex items-center">
            <Button size="lg" className="group">
              <Mail className="mr-2 h-4 w-4" />
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Button>
          </a>
          <Link href="/portfolio" className="flex items-center">
            <Button variant="outline" size="lg" className="group">
              <ExternalLink className="mr-2 h-4 w-4" />
              See my work
            </Button>
          </Link>
        </div>
      </motion.div>
    ),

    engineer: (
      <motion.div
        key="engineer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-12"
      >
        <section className="space-y-6">
          <TextScramble
            className="text-3xl font-bold tracking-tight"
            duration={0.5}
            characterSet=". "
          >
            Software Engineering
          </TextScramble>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            transition={{ delay: 0.1, duration: 0.5 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            Im a full stack software engineer with extensive experience building
            modern web applications and leading technical teams. My expertise
            spans across frontend, backend, and AI-driven applications, with a
            focus on creating scalable and maintainable solutions.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {softwareEngineerSkills.map((skill, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30"
              >
                <Spotlight className="bg-blue-500 blur-2xl" size={200} />
                <div className="relative h-full w-full rounded-xl bg-neutral-50 dark:bg-neutral-900">
                  <div className="space-y-3 p-6 rounded-lg ">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                      <span className="text-primary">{skill.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <motion.div
          className="h-px w-full bg-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />

        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-6 w-6" />
            <h2 className="text-2xl font-bold tracking-tight">Highlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineerHighlights.map((item, index) => (
              <Tilt rotationFactor={12} isRevese key={index} className="h-full">
                <motion.div
                  className="bg-muted/40 rounded-lg p-6 border border-border/40 h-full hover:border-neutral-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary">{item.icon}</span>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <TextEffect
            per="word"
            preset="fade"
            className="text-2xl font-bold tracking-tight"
          >
            My Tech Stack
          </TextEffect>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.97}
              />
              <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-border/40">
                <h3 className="text-lg font-bold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    React
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Next.js
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    TypeScript
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Tailwind CSS
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Shadcn UI
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    React Query
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Zod
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.97}
              />
              <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-border/40">
                <h3 className="text-lg font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Node.js
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Express
                  </Badge>

                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    PostgreSQL
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Drizzle ORM
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Better-Auth
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Clerk
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    AWS
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Azure
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Serverless
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.97}
              />
              <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-border/40">
                <h3 className="text-lg font-bold mb-4">AI & Data</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    OpenAI
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Claude
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    LangChain
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    AI SDK
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    PgVector
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Pinecone
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Llama Index
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Ollama
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    AWS Bedrock
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative group">
              <GlowEffect
                colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
                mode="colorShift"
                blur="medium"
                duration={4}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                scale={0.97}
              />
              <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-border/40">
                <h3 className="text-lg font-bold mb-4">Tools & Practices</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Git
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    GitHub Actions
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Docker
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    npm/yarn
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Turborepo
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    ESLint
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Prettier
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Vite
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center pt-8">
          <Button size="lg" className="group mr-4" onClick={downloadResume}>
            <FileText className="mr-2 h-4 w-4" />
            Download Resume
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
          </Button>

          <Link
            href="mailto:jacobowens75@gmail.com"
            className="flex items-center"
          >
            <Button variant="outline" size="lg" className="group">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </Link>
        </div>
      </motion.div>
    ),
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>

        <TextEffect
          per="word"
          preset="fade"
          className="text-4xl sm:text-5xl font-bold tracking-tight"
        >
          Work With Me
        </TextEffect>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you need a freelance developer for your next project or are
          looking to hire a full-time software engineer, Im here to help turn
          your ideas into reality.
        </p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-lg bg-muted/50 border border-border/40">
          <Button
            variant="ghost"
            className={cn(
              "rounded-md px-6",
              activeTab === "engineer" &&
                "bg-background shadow-sm hover:bg-white dark:hover:bg-neutral-950"
            )}
            onClick={() => setActiveTab("engineer")}
          >
            <Laptop className="h-4 w-4 mr-2" />
            Software Engineer
          </Button>{" "}
          <Button
            variant="ghost"
            className={cn(
              "rounded-md px-6",
              activeTab === "freelance" &&
                "bg-background shadow-sm hover:bg-white dark:hover:bg-neutral-950"
            )}
            onClick={() => setActiveTab("freelance")}
          >
            <Code className="h-4 w-4 mr-2" />
            Freelance
          </Button>
        </div>
      </div>

      {tabContent[activeTab]}
    </div>
  )
}

export default HireMePage
