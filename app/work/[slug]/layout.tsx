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
  const { slug } = await params;
  const project = DETAILED_PROJECTS[slug];

  if (!project) {
    return {
      title: 'Case Study Not Found',
      robots: { index: false, follow: false },
    };
  }

  // Determine dynamic title matching precise requests
  let pageTitle = `${project.brand} Brand Identity and Website — Shubham Shinde`;
  if (slug === "solaris") {
    pageTitle = "Solaris Independent Brand Concept — Shubham Shinde";
  } else if (slug === "optiv") {
    pageTitle = "Optiv Brand Concept Proposal — Shubham Shinde";
  }

  const description = project.metaDescription || projectSeoDescription(project);
  const url = absoluteUrl(`/work/${project.slug}`);

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: pageTitle,
      description,
      siteName: `${SITE_NAME} Portfolio`,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [project.image],
    },
  };
}

export default async function WorkDetailLayout({ children, params }: WorkLayoutProps) {
  const { slug } = await params;
  const project = DETAILED_PROJECTS[slug];

  if (!project) return children;

  const url = absoluteUrl(`/work/${project.slug}`);
  
  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#creative-work`,
    url,
    name: project.title,
    description: project.metaDescription || projectSeoDescription(project),
    image: absoluteUrl(project.image),
    about: project.tags,
    creator: {
      '@type': 'Person',
      '@id': absoluteUrl('/#shubham-shinde'),
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: absoluteUrl('/work'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.brand,
        item: url,
      },
    ],
  };

  return (
    <>
      <StructuredData id={`creative-work-${project.slug}`} data={creativeWorkJsonLd} />
      <StructuredData id={`breadcrumb-work-${project.slug}`} data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
