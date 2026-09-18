# Search visibility and portfolio reach

## After deploying this change

1. Add the URL-prefix property `https://ssspace.vercel.app/` in [Google Search Console](https://search.google.com/search-console/).
2. Choose HTML-tag verification. Copy only the tag's `content` value into the Vercel production environment variable `GOOGLE_SITE_VERIFICATION`. Redeploy, then complete verification in Search Console. The application omits the tag when this variable is unset. Do not put account credentials into the repository.
3. Submit `https://ssspace.vercel.app/sitemap.xml`. It includes the homepage, work archive, five case studies, and the new service page.
4. Use URL Inspection for the homepage, `/services/brand-web-design`, and the client case studies. Test the live URL and request indexing where appropriate. A submitted sitemap or indexing request does not guarantee indexing or ranking.
5. Check Page Indexing and Performance after Google has processed the pages. Record indexed pages, impressions, clicks, queries and click-through rate. Distinguish searches for Shubham's name from service-related searches.
6. Run PageSpeed Insights on the homepage and a case study. Use mobile results and available field data to prioritize performance work; do not infer a speed score from markup alone.

## Content and distribution

- Keep Bengaluru as Shubham's location. Pune references describing Studio Vistara's location are intentional.
- Behance is the broader portfolio, including work not shown on this website. Link to it as “More projects on Behance”; do not assume every Behance project is a client engagement or copy unreviewed case studies automatically.
- The existing case studies already describe the problem, role, decisions and outcomes. Add measured business outcomes only when evidence is available. Preserve the six-week Daulat engagement and distinguish concepts from launched client work.
- Share one existing client case study per week on LinkedIn or Behance, linking directly to its website page. Explain one design decision and show the related work. Publication requires the owner's action or explicit authorization; this code change does not publish social posts or contact clients.
- Example campaign URL: `https://ssspace.vercel.app/work/daulat-finvest?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio_case_studies`. Keep the page's canonical URL free of tracking parameters.
- Request relevant credits from collaborators or clients when appropriate; avoid bulk link purchases and generic directory submissions.

## Measurement

Use existing Vercel Analytics for traffic and referrers if enabled on the Vercel project. Track qualified project enquiries and recruiter contacts alongside traffic. No new custom-event plan or paid analytics service is required by this change. Search Console access, verification, submission and historical traffic data cannot be established from the repository alone.

Review after four weeks: which pages and search queries bring qualified visitors, which shared projects produce enquiries, and whether any important page remains excluded from indexing. Use that evidence to choose the next case study or service page.

References: [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Search Console setup](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
