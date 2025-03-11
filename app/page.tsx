import RecentBlogs from "@/components/blog/recent-blogs"
import Stack from "@/components/homepage/stack"
import Socials from "@/components/homepage/socials"
import Services from "@/components/homepage/services"
import Hero from "@/components/homepage/hero"
import { Spotlight } from "@/components/motion-primitives/spotlight"

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Services />
      <RecentBlogs />
      <Stack />
      <Socials />
    </div>
  )
}
