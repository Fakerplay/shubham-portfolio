import type { Metadata } from 'next'
import {
  DEFAULT_SHARE_IMAGE,
  SITE_NAME,
  absoluteUrl,
} from '@/lib/site'

const description =
  'Brand identity, website and motion design case studies by Shubham Shinde, a Bengaluru-based design lead with 6+ years of experience. Client work and concepts.'

export const metadata: Metadata = {
  title: {
    default: 'Selected Work',
    template: `%s | ${SITE_NAME}`,
  },
  description,
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/work'),
    title: `Selected Work | ${SITE_NAME}`,
    description,
    siteName: `${SITE_NAME} Portfolio`,
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Selected Work | ${SITE_NAME}`,
    description,
    images: [DEFAULT_SHARE_IMAGE],
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
