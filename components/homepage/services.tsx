"use client"

import React from "react"
import { motion } from "framer-motion"
import { BarChart, Code2, Lightbulb, Palette } from "lucide-react"
import { BorderTrail } from "../motion-primitives/border-trail"

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
  )
}

export default Services
