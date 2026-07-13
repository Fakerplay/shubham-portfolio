import type { MetadataRoute } from 'next'
import { DETAILED_PROJECTS } from '@/data/projects'
import { SITE_URL, absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: MetadataRoute.Sitemap = Object.values(DETAILED_PROJECTS).map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    changeFrequency: 'yearly',
    priority: 0.8,
    images: [absoluteUrl(project.image)],
  }))

  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
      images: [absoluteUrl('/images/project-1-cover.jpg')],
    },
    {
      url: absoluteUrl('/work'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: Object.values(DETAILED_PROJECTS).map((project) => absoluteUrl(project.image)),
    },
    ...projectRoutes,
  ]
}
