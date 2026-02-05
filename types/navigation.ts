export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Learn Japanese",
    href: "/learn",
    description: "Master the language with N5-N3 courses and expert instructors.",
  },
  {
    title: "Jobs in Japan",
    href: "/jobs",
    description: "Find career opportunities in factory, caregiving, IT, and more.",
  },
  {
    title: "Study & Exchange",
    href: "/study",
    description: "Discover language schools, universities, and exchange programs.",
  },
  {
    title: "Programs",
    href: "/programs",
    description: "Explore all our vacational and educational program offerings.",
  },
  {
    title: "Partners",
    href: "/partners",
    description: "Partner with us to access top Ugandan talent.",
  },
  {
    title: "Resources",
    href: "/blog",
    description: "Guides, news, and success stories for your journey.",
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "For Partners", href: "/partners" },
];
