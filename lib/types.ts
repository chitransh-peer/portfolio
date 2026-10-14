export type ProjectStatus = "completed" | "in-progress" | "upcoming";

export type ProjectCategory = "web" | "website" | "mobile" | "ai-ml" | "other";

export interface Project {
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  stack: string[];
  thumbnail: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  // Kept in the data but left out of every part of the UI.
  hidden?: boolean;
  features?: string[];
  achievements?: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}
