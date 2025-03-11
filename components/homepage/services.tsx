"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Code2,
  Database,
  Globe,
  Lightbulb,
  Palette,
} from "lucide-react"
import { Spotlight } from "../motion-primitives/spotlight"
const services = [
  {
    title: "Frontend Development",
    icon: <Code2 className="h-5 w-5" />,
    description:
      "Building responsive, performant web applications with React, Next.js, and modern frontend technologies that deliver exceptional user experiences.",
  },
  {
    title: "Backend Engineering",
    icon: <Database className="h-5 w-5" />,
    description:
      "Developing robust APIs, microservices, and server-side applications with Node.js, Python, and other backend technologies that scale efficiently.",
  },
  {
    title: "Full Stack Solutions",
    icon: <Globe className="h-5 w-5" />,
    description:
      "Creating end-to-end applications from conception to deployment, integrating frontend and backend systems into cohesive, production-ready products.",
  },
]

const Services = () => {
  return (
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
            className="relative h-full overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30"
          >
            <Spotlight className="bg-blue-500 blur-2xl" size={200} />
            <div className="relative h-full w-full rounded-xl bg-white dark:bg-black">
              <div className="space-y-3 p-6 bg-muted/30 rounded-lg border border-border/40">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <span className="text-primary">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export default Services
