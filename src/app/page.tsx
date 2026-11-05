import { HeroSection } from '@/components/home/hero-section'
import { GitHubActivity } from '@/components/home/github-activity'
import { TechStackSection } from '@/components/home/tech-stack-section'
import { ProjectsPreviewSection } from '@/components/home/projects-preview-section'
import { ArticlesSection } from '@/components/home/articles-section'
import { BeyondSection } from '@/components/home/beyond-section'
import { ContactSection } from '@/components/home/contact-section'
import { getGitHubContributions } from '@/lib/github-contributions'

export default async function Page() {
  // Cached on the server and refreshed every 12 hours; null hides the widget
  const contributions = await getGitHubContributions()

  return (
    <main>
      <HeroSection activity={contributions ? <GitHubActivity data={contributions} /> : null} />
      <TechStackSection />
      <ProjectsPreviewSection />
      <ArticlesSection />
      <BeyondSection />
      <ContactSection />
    </main>
  )
}
