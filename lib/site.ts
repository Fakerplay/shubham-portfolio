export const SITE_URL = "https://ssspace.vercel.app";
export const SITE_NAME = "Shubham Shinde";
export const SITE_LOCATION = "Bengaluru, India";
export const SITE_TITLE = "Shubham Shinde — Brand & Web Designer in Bengaluru";
export const SITE_DESCRIPTION =
  "Bengaluru-based design lead with 6+ years in brand identity, websites and campaigns for B2B SaaS, financial services and media. Explore work and discuss a project.";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/shubham-shinde-design/",
  behance: "https://behance.net/shubhamshinde",
} as const;

export const DEFAULT_SHARE_IMAGE = "/images/project-1-cover.jpg";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function projectSeoDescription(project: {
  brand: string;
  role: string;
  subtitle: string;
}) {
  return `${project.brand} case study by Shubham Shinde, ${project.role}. ${project.subtitle}`;
}
