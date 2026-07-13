import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { DETAILED_PROJECTS } from '@/data/projects'
import {
  SITE_NAME,
  absoluteUrl,
  projectSeoDescription,
} from '@/lib/site'

type WorkLayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: WorkLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const project = DETAILED_PROJECTS[slug]

  if (!project) {
    return {
      title: 'Case Study Not Found',
      robots: { index: false, follow: false },
    }
  }

  const description = projectSeoDescription(project)
  const url = absoluteUrl(`/work/${project.slug}`)

  return {
    title: `${project.brand} Case Study`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${project.title} | ${SITE_NAME}`,
      description,
      siteName: `${SITE_NAME} Portfolio`,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${SITE_NAME}`,
      description,
      images: [project.image],
    },
  }
}

export default async function WorkDetailLayout({ children, params }: WorkLayoutProps) {
  const { slug } = await params
  const project = DETAILED_PROJECTS[slug]

  if (!project) return children

  const url = absoluteUrl(`/work/${project.slug}`)
  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#creative-work`,
    url,
    name: project.title,
    description: projectSeoDescription(project),
    image: absoluteUrl(project.image),
    about: project.tags,
    creator: {
      '@type': 'Person',
      '@id': absoluteUrl('/#shubham-shinde'),
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  }

  return (
    <>
      <StructuredData id={`creative-work-${project.slug}`} data={creativeWorkJsonLd} />
      {children}
    </>
  )
}
