import { Project } from "@/lib/types";

// Add or remove projects here. The grid, filters, and featured section
// all read from this single array — nothing else needs to change.
//
// Ordering is deliberate: the applications we built and run come first,
// then the client-facing websites.
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
    slug: "ats-tracker",
    name: "ATS Tracker",
    summary: "An end-to-end applicant tracking system for requisitions, candidates, and interviews.",
    description:
      "An end-to-end Applicant Tracking System — a full recruiting OS covering job requisitions, candidate funnels, and interview workflows, with authenticated access for hiring teams.",
    category: "web",
    status: "completed",
    stack: ["Recruiting", "Cloud Run", "Auth"],
    thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    demoUrl: "https://ats.peer-consulting.com",
  },
  {
    slug: "glpi-service-desk",
    name: "GLPI Service Desk",
    summary: "ITIL-compliant service desk with IT asset management and issue tracking.",
    description:
      "IT asset management, issue tracking, and ITIL-compliant service desk software, giving support teams a single place to manage inventory and tickets.",
    category: "other",
    status: "completed",
    stack: ["ITSM", "ITIL", "Asset Management"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    demoUrl: "https://glpi.peer-consulting.com",
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
    // The internal processing system — distinct from the public-facing
    // Resolute site further down, which is a separate build.
    slug: "resolute-title-platform",
    name: "Resolute Title Platform",
    summary: "A title processing, document management, and property management portal.",
    description:
      "A comprehensive internal portal for Resolute Title Services covering title processing, document management, and property management, behind authenticated access.",
    category: "web",
    status: "completed",
    stack: ["Web", "Document Management", "Auth"],
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    demoUrl: "https://system.resolutetitleservices.com",
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
  {
    slug: "peer-consulting-site",
    name: "Peer Consulting Resources",
    summary: "The corporate site for our consulting, training, and staffing practice.",
    description:
      "Powering digital growth through trusted technology. The corporate hub covering our consulting, cloud, and digital transformation work across New Jersey, New York, and Connecticut.",
    category: "website",
    status: "completed",
    stack: ["Corporate Site", "Web"],
    thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    demoUrl: "https://peer-consulting.com",
  },
  {
    slug: "elshakaya-solutions",
    name: "Elshakaya Solutions",
    summary: "A corporate site for an IT business solutions and government delivery firm.",
    description:
      "Turning business challenges into scalable solutions — a corporate site for a Brooklyn-based firm delivering purpose-built technology, domain expertise, and top-tier talent to business and government clients.",
    category: "website",
    status: "completed",
    stack: ["Corporate Site", "Web"],
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    demoUrl: "https://elshakaya.com",
  },
  {
    slug: "marven-technologies",
    name: "Marven Technologies",
    summary: "A corporate site for a software engineering and technical staffing partner.",
    description:
      "Engineering the next chapter of your business — a corporate site for a firm building reliable, scalable software and partnering with teams on modernization, integration, and technical staffing.",
    category: "website",
    status: "completed",
    stack: ["Corporate Site", "Web"],
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    demoUrl: "https://marventechnologies.com",
  },
  {
    slug: "resolute-title-site",
    name: "Resolute Title Services",
    summary: "A public site for nationwide title search across all 50 states.",
    description:
      "Nationwide title search and abstracting across all 50 states and 3,140+ counties, with fast, commitment-ready reports for residential and commercial properties.",
    category: "website",
    status: "completed",
    stack: ["Web", "Title Search"],
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    demoUrl: "https://resolutetitleservices.com",
  },
];
