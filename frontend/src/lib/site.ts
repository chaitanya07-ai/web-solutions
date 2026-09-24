// Replace this ONE value to activate every appointment / call button.
export const GOOGLE_FORM_URL: string = "https://docs.google.com/forms/d/e/1FAIpQLSc-7DN8icO0vVKUADp8FhjyPTbiFhN1gtT6-RcCJmqgspO6QA/viewform";
export const SITE = {
  name: "Web Solutions",
  email: "info@web-solutions.in",
  instagram: "https://instagram.com/chaitanya07__07",
  countries: ["India", "United States", "Canada", "United Kingdom", "Australia", "Thailand"],
};

export interface Project {
  slug: string;
  name: string;
  category: string;
  headline: string;
  image: string;
  gallery: string[];
  description: string;
  approach: string;
  services: string[];
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "forma", name: "FORMA", category: "Architecture & interiors",
    headline: "A considered space. A digital expression.",
    image: "/assets/forma-cover.webp",
    gallery: ["/assets/forma-detail.webp", "/assets/forma-brand.webp"],
    description: "A digital exploration of contemporary living. FORMA brings the warmth of natural materials and the precision of architectural thinking into one considered online experience.",
    approach: "Let the spaces speak. Generous proportions, a warm neutral palette and restrained typography give every object room to breathe. Editorial storytelling makes the journey feel like stepping into a beautifully designed home.",
    services: ["Creative direction", "Website design", "Digital commerce"], accent: "#c6b69b",
  },
  {
    slug: "soniq", name: "SONIQ", category: "Sound & technology",
    headline: "Less noise. More feeling.",
    image: "/assets/soniq-cover.webp",
    gallery: ["/assets/soniq-detail.webp", "/assets/soniq-mobile.webp"],
    description: "An immersive product experience built around the feeling of sound. SONIQ explores the intersection of industrial design, expressive typography and precision-led digital commerce.",
    approach: "Make the product the protagonist. Dark surfaces, sculptural product imagery and focused interaction patterns create a confident, distraction-free path from discovery to desire.",
    services: ["Art direction", "Product experience", "UI / UX design"], accent: "#e29867",
  },
  {
    slug: "elan", name: "ÉLAN", category: "Fragrance & lifestyle",
    headline: "An impression that stays.",
    image: "/assets/elan-cover.webp",
    gallery: ["/assets/elan-detail.webp", "/assets/elan-brand.webp"],
    description: "A sensory approach to digital luxury. An exploration of how expressive imagery and a quiet interface can translate the character of a fragrance into an online experience.",
    approach: "Build atmosphere, not distraction. Cinematic close-ups and editorial pacing are paired with a clear product hierarchy. The result is an intimate, tactile visual language for an intangible product.",
    services: ["Brand experience", "E-commerce design", "Visual storytelling"], accent: "#c7ba83",
  },
  {
    slug: "roast", name: "ROAST", category: "Coffee & hospitality",
    headline: "Good mornings start here.",
    image: "/assets/roast-cover.webp",
    gallery: ["/assets/roast-detail.webp", "/assets/roast-brand.webp"],
    description: "A warm, characterful coffee experience. ROAST turns the everyday ritual of coffee into an editorial journey through origin, craft and flavour.",
    approach: "Find the human detail. Rich photography, tactile colours and conversational copy create a welcoming digital space. An intuitive product and menu structure keeps the experience as effortless as your first sip.",
    services: ["Website design", "Digital menu", "Brand storytelling"], accent: "#baa68d",
  },
];

export interface Service { title: string; description: string; tags: string[]; visual: "web" | "menu" | "ai" | "automation" | "data" | "commerce" | "care" }
export const services: Service[] = [
  { title: "Web design & development", description: "Distinctive websites designed around your business. We unite strategy, thoughtful design and fast, responsive development to turn first impressions into lasting connections.", tags: ["UI / UX", "Custom development", "Responsive design"], visual: "web" },
  { title: "Smart e-menus", description: "A beautiful menu, always within reach. QR-powered digital menus and price lists that make discovery effortless and updates instant.", tags: ["QR menus", "Live updates", "Hospitality"], visual: "menu" },
  { title: "AI & customer experience", description: "A tireless assistant that understands your business. Answer questions, capture leads and help customers find what they need, at any hour.", tags: ["AI assistants", "Lead capture", "24/7 support"], visual: "ai" },
  { title: "Intelligent automation", description: "Give your people their time back. Voice, WhatsApp and Instagram workflows connect conversations, appointments and follow-ups into one intelligent system.", tags: ["Voice agents", "Messaging", "Workflow design"], visual: "automation" },
  { title: "Dashboards & analytics", description: "Clarity for every decision. A single, intuitive control room for your leads, orders, bookings and content, built around the way your team works.", tags: ["Admin dashboards", "CRM", "Business insights"], visual: "data" },
  { title: "Commerce & booking", description: "From interest to action, without the friction. Thoughtful storefronts, secure payments and seamless reservations that work together beautifully.", tags: ["E-commerce", "Payments", "Reservations"], visual: "commerce" },
  { title: "SEO & ongoing care", description: "Launch is a beginning, not a goodbye. Performance, technical SEO, updates and ongoing care keep your digital presence ready for what comes next.", tags: ["Technical SEO", "Performance", "Maintenance"], visual: "care" },
];

export const faqs = [
  { q: "What does working together look like?", a: "We start with a discovery conversation and a sample homepage, then move through design, development, testing and launch. You work with us throughout, with clear milestones and room for feedback." },
  { q: "How long does a project take?", a: "Most website projects take 7–14 days. Larger builds involving bookings, payments or dashboards can take longer. We agree a realistic timeline during discovery, before work begins." },
  { q: "Do you work with businesses internationally?", a: "Yes. Our existing work spans India, the USA, Canada, Australia, the United Kingdom and Thailand. We work remotely and schedule conversations around your time zone." },
  { q: "What happens after launch?", a: "We help you settle into your new website, with training and ongoing support. Optional care plans cover updates, maintenance and improvements as your business evolves." },
];
