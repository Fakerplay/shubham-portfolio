import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import { SITE_LOCATION, SITE_NAME, SOCIAL_LINKS, DEFAULT_SHARE_IMAGE, absoluteUrl } from '@/lib/site'

const title = 'Brand Identity & Website Design in Bengaluru'
const description = 'Brand identity and website design by Shubham Shinde in Bengaluru. Strategy, visual systems, landing pages and launch design for startups and growing businesses.'
const url = absoluteUrl('/services/brand-web-design')

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    title: `${title} | ${SITE_NAME}`,
    description,
    url,
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [DEFAULT_SHARE_IMAGE],
  },
}

const work = [
  { slug: 'daulat-finvest', name: 'Daulat Wealth Management', detail: 'Strategy, visual direction, website design and development for a founder-led wealth management firm. Launched in six weeks.' },
  { slug: 'solace', name: 'Solace AI', detail: 'Brand identity and website design for a wellness technology brand, connecting an organic visual language with editorial typography.' },
  { slug: 'studio-vistara', name: 'Studio Vistara', detail: 'A launch identity and website for an architecture practice, extending its spatial approach into a visual system.' },
]

export default function BrandWebDesignPage() {
  return (
    <article className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 pt-40 pb-24 text-foreground">
      <StructuredData id="brand-web-design-service" data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: 'Brand identity and website design',
        description,
        url,
        serviceType: ['Brand identity design', 'Website design', 'Creative direction'],
        provider: { '@type': 'Person', '@id': absoluteUrl('/#shubham-shinde'), name: SITE_NAME, url: absoluteUrl('/') },
        areaServed: 'Worldwide',
      }} />
      <nav aria-label="Breadcrumb" className="font-sans text-sm text-foreground/70 mb-10">
        <Link href="/" className="underline underline-offset-4">Home</Link>
        <span aria-hidden="true"> / </span>
        <span>Brand &amp; web design</span>
      </nav>
      <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight max-w-4xl text-balance">
        Brand identity &amp; website design in Bengaluru.
      </h1>
      <p className="mt-8 max-w-3xl font-serif text-xl md:text-2xl leading-relaxed">
        I’m Shubham Shinde, a design lead based in {SITE_LOCATION}, working worldwide.
        I help startups and growing businesses turn their positioning into identities,
        websites and launch materials that work together.
      </p>
      <p className="mt-5 max-w-3xl font-sans text-base leading-relaxed text-foreground/75">
        My experience spans B2B SaaS, financial services and media—from product-marketing
        campaigns and landing pages to brand systems and creative direction. I work with
        founders and marketing teams who need a clear visual direction and the practical
        assets to carry it through.
      </p>
      <Link href="/#contact" className="inline-flex mt-8 px-6 py-3 rounded-xl bg-foreground text-background font-sans font-medium hover:opacity-80 transition-opacity">
        Discuss your project →
      </Link>

      <section className="mt-20 border-t border-foreground/15 pt-10">
        <h2 className="font-serif text-3xl md:text-4xl font-light">From identity to launch.</h2>
        <dl className="mt-8 divide-y divide-foreground/15">
          {[
            ['Brand identity and visual systems', 'Visual direction, typography, colour, imagery and guidelines that help your team communicate consistently across channels.'],
            ['Websites and landing pages', 'Content hierarchy, responsive page design and website development, with a clear route from understanding your business to getting in touch.'],
            ['Campaigns and launch design', 'Product-marketing visuals, motion content, presentations and social assets that extend the same visual direction beyond the website.'],
          ].map(([name, detail]) => (
            <div key={name} className="py-6 grid md:grid-cols-2 gap-3 md:gap-12">
              <dt className="font-serif text-xl md:text-2xl">{name}</dt>
              <dd className="font-sans text-base leading-relaxed text-foreground/75">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 border-t border-foreground/15 pt-10">
        <h2 className="font-serif text-3xl md:text-4xl font-light">See the work behind the services.</h2>
        <div className="mt-8 divide-y divide-foreground/15">
          {work.map((project) => (
            <div key={project.slug} className="py-6 max-w-3xl">
              <h3 className="font-serif text-2xl">
                <Link href={`/work/${project.slug}`} className="underline underline-offset-4 hover:text-foreground/70">{project.name} →</Link>
              </h3>
              <p className="mt-3 font-sans leading-relaxed text-foreground/75">{project.detail}</p>
            </div>
          ))}
        </div>
        <a href={SOCIAL_LINKS.behance} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 font-sans underline underline-offset-4">
          Explore more projects on Behance ↗
        </a>
      </section>

      <section className="mt-16 border-t border-foreground/15 pt-10 max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl font-light">What are you building?</h2>
        <p className="mt-6 font-sans leading-relaxed text-foreground/75">
          Share what your business does, who you need to reach, and whether you need an
          identity, a website or support for a launch. Include your timeline and existing
          materials so we can discuss a useful scope. The case studies show individual
          project timelines; your schedule will depend on the work involved.
        </p>
        <Link href="/#contact" className="inline-block mt-6 font-sans font-medium underline underline-offset-4">Tell me about the project →</Link>
        <p className="mt-8 font-sans text-sm text-foreground/70">
          Hiring for a design-leadership role? <Link href="/#experience" className="underline underline-offset-4">Explore my experience</Link> or <a href="/resume.pdf" className="underline underline-offset-4">download my résumé</a>.
        </p>
      </section>
    </article>
  )
}
