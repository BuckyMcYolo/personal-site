"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion-primitives/magnetic"
import { Twitter, Github, Instagram, Linkedin } from "lucide-react"

const Socials = () => {
  return (
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
  )
}

export default Socials
