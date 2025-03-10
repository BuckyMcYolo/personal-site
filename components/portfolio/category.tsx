import { TextEffect } from "../motion-primitives/text-effect"
import { ProjectCard } from "./project-card"

export const CategorySection = ({
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
