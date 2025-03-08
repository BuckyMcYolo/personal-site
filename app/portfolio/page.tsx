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

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  link,
  delay = 0,
}: {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <Link href={link} className="block">
        <div className="rounded-lg border border-border/40 overflow-hidden bg-muted/40 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-md">
          <div className="h-48 relative bg-gradient-to-br from-muted to-background overflow-hidden">
            {image && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs py-1 px-2 rounded-full bg-muted border border-border/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const CategorySection = ({
  title,
  icon,
  description,
  projects,
}: {
  title: string
  icon: React.ComponentType<any>
  description: string
  projects: any[]
}) => {
  const Icon = icon

  return (
    <section className="py-10">
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">
            <TextEffect per="char" preset="fade">
              {title}
            </TextEffect>
          </h2>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>
    </section>
  )
}

const PortfolioPage = () => {
  const categories = [
    {
      title: "Web Applications",
      icon: Code2,
      description: "Full-stack web applications built with modern technologies",
      projects: [
        {
          title: "Task Management Platform",
          description:
            "A collaborative task management platform with real-time updates and team features",
          tags: ["React", "Node.js", "Postgres", "WebSockets"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/task-management",
        },
        {
          title: "Finance Dashboard",
          description:
            "Interactive dashboard for monitoring financial metrics and visualizing data",
          tags: ["Next.js", "Tailwind", "Recharts", "API Integration"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/finance-dashboard",
        },
        {
          title: "E-learning Platform",
          description:
            "Educational platform with course management, quizzes, and progress tracking",
          tags: ["React", "Express", "MongoDB", "Authentication"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/e-learning",
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
          title: "Eco-friendly Product Site",
          description:
            "E-commerce website for eco-friendly products with dynamic filtering and cart functionality",
          tags: ["Next.js", "Tailwind CSS", "Shopify API"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/eco-products",
        },
        {
          title: "Architecture Portfolio",
          description:
            "Visually stunning portfolio website for an architecture firm featuring project galleries",
          tags: ["React", "GSAP", "Responsive Design"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/architecture",
        },
        {
          title: "Food Delivery Service",
          description:
            "Website for a local food delivery service with ordering capabilities",
          tags: ["Next.js", "Stripe", "Google Maps API"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/food-delivery",
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
          title: "AI Content Generator",
          description:
            "Tool that generates marketing copy and social media content using AI",
          tags: ["OpenAI API", "React", "Node.js"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/ai-content",
        },
        {
          title: "Intelligent Customer Service",
          description:
            "AI-powered customer service chatbot with context awareness",
          tags: ["Claude API", "Next.js", "Vercel AI SDK"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/customer-service",
        },
        {
          title: "Image Analysis Tool",
          description:
            "Platform for analyzing and extracting data from images using AI",
          tags: ["Computer Vision", "React", "Python"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/image-analysis",
        },
      ],
    },
    {
      title: "Servers & APIs",
      icon: Smartphone,
      description: "Backend servers, APIs, and microservices",
      projects: [
        {
          title: "Fitness Tracker",
          description:
            "Mobile app for tracking workouts, nutrition, and health metrics",
          tags: ["React Native", "Redux", "Health APIs"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/fitness-tracker",
        },
        {
          title: "Travel Companion",
          description:
            "App for planning trips, finding local attractions, and managing itineraries",
          tags: ["React Native", "Maps Integration", "Firebase"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/travel-companion",
        },
      ],
    },
    {
      title: "Other Projects",
      icon: Layers,
      description: "Various other technical projects and experiments",
      projects: [
        {
          title: "Open Source Library",
          description:
            "JavaScript utility library for common frontend tasks with over 500 GitHub stars",
          tags: ["JavaScript", "Open Source", "NPM Package"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/open-source",
        },
        {
          title: "Developer Toolkit",
          description:
            "Collection of tools for web developers including code generators and debugging utilities",
          tags: ["TypeScript", "CLI", "Developer Tools"],
          image: "/api/placeholder/600/400",
          link: "/portfolio/dev-toolkit",
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
