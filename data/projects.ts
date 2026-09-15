import { Project } from "@/lib/types";

// Add or remove projects here. The grid, filters, and featured section
// all read from this single array — nothing else needs to change.
export const projects: Project[] = [
  {
    slug: "itil-elearning",
    name: "ITIL eLearning",
    summary: "An ITIL eLearning platform with authentication and subscription-based modules.",
    description:
      "An ITIL eLearning platform featuring an authentication and subscription-based model for different modules, giving learners structured access to certification-track content.",
    category: "web",
    status: "completed",
    stack: ["Web", "Auth", "Subscriptions"],
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    demoUrl: "https://itil.peer-consulting.com",
    featured: true,
  },
  {
    slug: "it-service-ticket-automation",
    name: "IT Service Ticket Automation",
    summary: "A ticket automation demo built around a restaurant chain support use case.",
    description:
      "A ticket automation demo based on a Peruvian restaurant chain use case, showing how inbound support tickets can be routed and resolved automatically. No authentication is required to explore the demo.",
    category: "ai-ml",
    status: "completed",
    stack: ["Automation", "ITSM"],
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    demoUrl: "https://itsm-eng.peer-consulting.com",
  },
  {
    slug: "nj-voters-dashboard",
    name: "NJ Voters Dashboard",
    summary: "An analytics dashboard with AI-driven cultural background classification.",
    description:
      "A dashboard featuring AI-driven cultural background classification for voter data analysis, hosted on Cloud Run prior to subdomain migration.",
    category: "ai-ml",
    status: "completed",
    stack: ["AI/ML", "Dashboard", "Cloud Run"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    demoUrl: "https://nj-dashboard-579571233812.us-east4.run.app/",
  },
  {
    slug: "english-elearning",
    name: "English eLearning",
    summary: "An eLearning platform for language proficiency and professional communication.",
    description:
      "English eLearning platform for language proficiency, training programs, and professional communication skills.",
    category: "web",
    status: "completed",
    stack: ["Web", "eLearning"],
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    demoUrl: "https://english.peer-consulting.com",
  },
];
