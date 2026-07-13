export const SITE_URL = "https://ssspace.vercel.app";
export const SITE_NAME = "Shubham Shinde";
export const SITE_TITLE = "Shubham Shinde | Brand, Web & Motion Designer";
export const SITE_DESCRIPTION =
  "Portfolio of Shubham Shinde, a Pune-based visual storyteller creating brand identities, websites, motion design, and launch visuals for startups and growing brands.";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/shubham-shinde-design/",
  behance: "https://www.behance.net/shubhamshinde",
  instagram: "https://www.instagram.com/5hinde/",
} as const;

export const DEFAULT_SHARE_IMAGE = "/images/project-1-cover.jpg";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function projectSeoDescription(project: {
  brand: string;
  title: string;
  tags: string[];
}) {
  return `${project.brand} case study by Shubham Shinde: ${project.title}. Work across ${project.tags.join(", ")}.`;
}
