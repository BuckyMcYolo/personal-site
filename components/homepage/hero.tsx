"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Rocket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import { TextEffect } from "@/components/motion-primitives/text-effect"

const Hero = () => {
  const [isButtonHovered, setIsButtonHovered] = React.useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    if (window && window.innerWidth) {
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

  return (
    <>
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
          Full stack developer, entrepreneur, and startup founder. I&apos;m
          passionate about solving business problems with clever and innovative
          solutions.
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
          <div
            className="relative"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
              mode="colorShift"
              blur="soft"
              duration={isButtonHovered ? 1 : 3}
              scale={screenWidth < 768 ? 1 : isButtonHovered ? 0.9 : 0.8}
            />
            <Button
              variant="outline"
              size="lg"
              asChild
              className="relative dark:hover:bg-black w-full"
            >
              <Link href="/hire-me">Hire me</Link>
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
          I specialize in building full stack web apps from concept to
          deployment. With expertise across the entire stack, I love creating
          innovative solutions for startups and businesses.
        </p>
      </motion.section>
    </>
  )
}

export default Hero
