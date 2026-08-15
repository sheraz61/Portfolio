import { HeroSection } from '@/components/home/hero-section'
import { TechStackSection } from '@/components/home/tech-stack-section'
import { ProjectsPreviewSection } from '@/components/home/projects-preview-section'
import { ArticlesSection } from '@/components/home/articles-section'
import { BeyondSection } from '@/components/home/beyond-section'
import { ContactSection } from '@/components/home/contact-section'

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TechStackSection />
      <ProjectsPreviewSection />
      <ArticlesSection />
      <BeyondSection />
      <ContactSection />
    </main>
  )
}
