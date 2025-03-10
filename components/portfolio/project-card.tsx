import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export const ProjectCard = ({
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
      <Link href={link} className="block" target="_blank">
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
