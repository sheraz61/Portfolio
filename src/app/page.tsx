import { HeroSection } from '@/components/home/hero-section'
import { GitHubActivity } from '@/components/home/github-activity'
import { TechStackSection } from '@/components/home/tech-stack-section'
import { ProjectsPreviewSection } from '@/components/home/projects-preview-section'
import { ArticlesSection } from '@/components/home/articles-section'
import { BeyondSection } from '@/components/home/beyond-section'
import { ContactSection } from '@/components/home/contact-section'
import { getGitHubContributions } from '@/lib/github-contributions'
import { getArticles } from '@/lib/articles'

export default async function Page() {
  // Both are cached on the server: GitHub every 12 hours (null hides the widget), Medium every 6 hours
  const [contributions, articles] = await Promise.all([getGitHubContributions(), getArticles()])

  return (
    <main>
      <HeroSection activity={contributions ? <GitHubActivity data={contributions} /> : null} />
      <TechStackSection />
      <ProjectsPreviewSection />
      <ArticlesSection articles={articles} />
      <BeyondSection />
      <ContactSection />
    </main>
  )
}
