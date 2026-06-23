// Single source of truth for Launch Peak Studio content

export const BOOKING_URL =
  'https://famous.ai/api/crm/6a39e287708138786b561e2d/calendar/public?calendarId=2d34c9d6-a362-4470-9d61-5c2b71124214&view=booking';

export const SUBSCRIBE_URL =
  'https://famous.ai/api/crm/6a39e287708138786b561e2d/subscribe';

export const CALCOM_LINK = 'launchpeakstudio/30min';

export const STUDIO = {
  name: 'Launch Peak Studio',
  tagline: 'From startup to summit.',
  positioning:
    'We design, build, launch, and scale digital products that take clients from startup to summit.',
  email: 'hello@launchpeakstudio.com',
  location: 'Portland, Oregon and global',
  owner: 'Tatiana Rogel',
};

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  icon: string; // lucide icon name
  priceFrom: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'ui-ux',
    title: 'UI / UX Design',
    short: 'Product design that feels effortless.',
    description:
      'We turn fuzzy ideas into clear, beautiful product experiences. Research, flows, wireframes, and a polished design system your team can build on.',
    deliverables: [
      'User research and flows',
      'Wireframes and prototypes',
      'High fidelity UI',
      'Design system and tokens',
    ],
    icon: 'PenTool',
    priceFrom: 'from $4k',
  },
  {
    slug: 'web',
    title: 'Web Design + Development',
    short: 'Sites and web apps that convert.',
    description:
      'Fast, modern websites and web apps built to win clients. Clean code, great performance, and a design that earns trust on the first scroll.',
    deliverables: [
      'Marketing sites and web apps',
      'Responsive front end build',
      'CMS and integrations',
      'SEO and performance',
    ],
    icon: 'Monitor',
    priceFrom: 'from $6k',
  },
  {
    slug: 'mobile',
    title: 'Mobile App Design + Build',
    short: 'Apps people love to open.',
    description:
      'From first sketch to App Store. We design and build mobile experiences that feel native, smooth, and ready to scale with your growth.',
    deliverables: [
      'iOS and Android design',
      'Cross platform build',
      'API and backend wiring',
      'Launch and iteration',
    ],
    icon: 'Smartphone',
    priceFrom: 'from $9k',
  },
];

export interface CaseResult {
  value: string;
  label: string;
}

export interface WorkItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  blurb: string;
  result: string;
  image: string;
  // Case study detail
  industry: string;
  timeline: string;
  services: string[];
  challenge: string;
  approach: string[];
  designNote: string;
  gallery: string[];
  build: string[];
  results: CaseResult[];
  quote: { text: string; name: string; role: string };
}

const IMG = {
  mobile1: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178580399_5f4b5d4e.png',
  mobile2: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178577508_72a52b48.jpg',
  mobile3: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178600738_e1849b06.jpg',
  mobile4: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178581262_88892679.jpg',
  web1: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178606019_9f197073.png',
  web2: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178611466_b5277d65.png',
  web3: 'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178600738_e1849b06.jpg',
};

export const WORK: WorkItem[] = [
  {
    slug: 'northwind-fintech',
    title: 'Northwind Finance App',
    client: 'Northwind',
    category: 'Mobile',
    blurb: 'A friendly budgeting app that turned a spreadsheet into a habit.',
    result: '+38% activation',
    image: IMG.mobile1,
    industry: 'Fintech',
    timeline: '10 weeks',
    services: ['UI/UX Design', 'Mobile Development'],
    challenge:
      'Northwind had a loyal spreadsheet crowd but their early app felt cold and confusing. New users signed up, poked around once, and never came back. They needed an app that made budgeting feel light and even a little fun.',
    approach: [
      'Ran quick interviews with real users to find the moments that caused drop off.',
      'Reframed budgeting around small wins instead of strict rules.',
      'Designed a warm, encouraging onboarding that gets people to their first insight fast.',
      'Prototyped and tested the core flow before writing production code.',
    ],
    designNote:
      'We leaned into soft color, friendly copy, and big tappable numbers. The goal was a screen people feel calm looking at, not stressed.',
    gallery: [IMG.mobile1, IMG.mobile2, IMG.mobile4],
    build: [
      'Cross platform build for iOS and Android from one codebase.',
      'Secure bank sync and clean data syncing layer.',
      'Reusable component library so new screens ship in days, not weeks.',
      'Analytics wired to track activation and retention from day one.',
    ],
    results: [
      { value: '+38%', label: 'New user activation' },
      { value: '2.4x', label: 'Weekly active users' },
      { value: '4.8', label: 'App store rating' },
    ],
    quote: {
      text: 'Launch Peak felt like a real partner, not a vendor. They designed and built our app fast and it just works. Our activation jumped right after launch.',
      name: 'Marcus Reed',
      role: 'Founder, Northwind',
    },
  },
  {
    slug: 'summit-saas',
    title: 'Summit SaaS Platform',
    client: 'Summit',
    category: 'Web',
    blurb: 'A marketing site and dashboard that helped close a seed round.',
    result: '2.1x demo bookings',
    image: IMG.web1,
    industry: 'B2B SaaS',
    timeline: '8 weeks',
    services: ['UI/UX Design', 'Web Development'],
    challenge:
      'Summit was raising a seed round but their site made them look smaller than they were. Investors and customers could not tell what the product did in the first ten seconds.',
    approach: [
      'Clarified the core message into one clear promise.',
      'Mapped the buyer journey from first click to booked demo.',
      'Designed a marketing site plus a clean product dashboard.',
      'Built fast, SEO friendly pages that load in well under a second.',
    ],
    designNote:
      'We used confident typography and a calm, trustworthy layout so a small team could look established and fundable.',
    gallery: [IMG.web1, IMG.web2, IMG.web3],
    build: [
      'Modern responsive front end with smooth motion.',
      'Reusable design system shared across site and product.',
      'CMS so the team can publish without a developer.',
      'Conversion events tracked on every key CTA.',
    ],
    results: [
      { value: '2.1x', label: 'Demo bookings' },
      { value: '0.6s', label: 'Largest paint time' },
      { value: 'Seed', label: 'Round closed' },
    ],
    quote: {
      text: 'Our new site helped us close our seed round. Tatiana understood the vision in one call and delivered work that looked twice our size. Five stars.',
      name: 'Priya Nair',
      role: 'CEO, Summit',
    },
  },
  {
    slug: 'harbor-commerce',
    title: 'Harbor Commerce',
    client: 'Harbor',
    category: 'Web',
    blurb: 'A storefront rebuild that made checkout feel effortless.',
    result: '+27% conversion',
    image: IMG.web2,
    industry: 'Ecommerce',
    timeline: '9 weeks',
    services: ['UI/UX Design', 'Web Development'],
    challenge:
      'Harbor had great products but a clunky checkout that lost shoppers at the last step. Cart abandonment was high and mobile was painful.',
    approach: [
      'Studied the full path to purchase and mapped every friction point.',
      'Redesigned product and checkout pages mobile first.',
      'Trimmed the checkout to the fewest possible steps.',
      'A/B tested key changes before full rollout.',
    ],
    designNote:
      'Clean product photography, clear pricing, and a one screen checkout that feels safe and quick.',
    gallery: [IMG.web2, IMG.web1, IMG.web3],
    build: [
      'Fast storefront with optimized images.',
      'Streamlined one page checkout flow.',
      'Payment and shipping integrations.',
      'Performance and accessibility passes.',
    ],
    results: [
      { value: '+27%', label: 'Checkout conversion' },
      { value: '-34%', label: 'Cart abandonment' },
      { value: '+19%', label: 'Mobile revenue' },
    ],
    quote: {
      text: 'Checkout conversions went up almost 30 percent. Clear communication, fast turnaround, and a team that actually cares about results.',
      name: 'Elena Torres',
      role: 'COO, Harbor',
    },
  },
  {
    slug: 'atlas-uiux',
    title: 'Atlas Design System',
    client: 'Atlas',
    category: 'UI/UX',
    blurb: 'A unified design system that sped up their whole product team.',
    result: '3x faster ship',
    image: IMG.mobile4,
    industry: 'Enterprise software',
    timeline: '7 weeks',
    services: ['UI/UX Design', 'Design Systems'],
    challenge:
      'Atlas had three products that all looked slightly different. Designers and engineers wasted time rebuilding the same pieces over and over.',
    approach: [
      'Inventoried every component across the products.',
      'Defined a single source of truth with tokens and rules.',
      'Documented usage so any team member can self serve.',
      'Paired with their engineers to ship the coded library.',
    ],
    designNote:
      'A flexible, warm system that still feels enterprise grade. Consistent, accessible, and easy to extend.',
    gallery: [IMG.mobile4, IMG.web1, IMG.mobile1],
    build: [
      'Token based theme shared across products.',
      'Coded component library with documentation.',
      'Accessibility baked into every component.',
      'Handoff and contribution guidelines.',
    ],
    results: [
      { value: '3x', label: 'Faster feature ship' },
      { value: '1', label: 'Unified system' },
      { value: '-40%', label: 'Design rework' },
    ],
    quote: {
      text: 'They take you from startup to summit for real. Thoughtful design, solid code, and a process that made the whole thing feel easy.',
      name: 'James Whitfield',
      role: 'Founder, Atlas',
    },
  },
  {
    slug: 'pine-mobile',
    title: 'Pine Field Service',
    client: 'Pine',
    category: 'Mobile',
    blurb: 'A rugged, simple app for teams working out in the field.',
    result: '12k weekly users',
    image: IMG.mobile3,
    industry: 'Field operations',
    timeline: '11 weeks',
    services: ['UI/UX Design', 'Mobile Development'],
    challenge:
      'Pine field crews needed an app that worked with gloves on, in bright sun, and with spotty signal. The old tool was slow and easy to mistap.',
    approach: [
      'Shadowed real crews to understand the conditions.',
      'Designed for big targets, high contrast, and one hand use.',
      'Made the app work offline and sync when back online.',
      'Tested with crews in the field before launch.',
    ],
    designNote:
      'Bold, high contrast, and simple. Every important action is one big tap away.',
    gallery: [IMG.mobile3, IMG.mobile1, IMG.mobile2],
    build: [
      'Offline first architecture with reliable sync.',
      'Large touch targets and readable typography.',
      'Photo capture and job status updates.',
      'Battery friendly performance tuning.',
    ],
    results: [
      { value: '12k', label: 'Weekly active users' },
      { value: '-45%', label: 'Mistap errors' },
      { value: '99.9%', label: 'Sync reliability' },
    ],
    quote: {
      text: 'Our field teams love the new app. Simple, fast, and reliable. Launch Peak listened closely and nailed it on the first round.',
      name: 'Sofia Marin',
      role: 'Director, Pine',
    },
  },
];

export const WORK_FILTERS = ['All', 'UI/UX', 'Web', 'Mobile'];

export interface Review {
  name: string;
  role: string;
  text: string;
  avatar: string;
  stars: number;
}

export const REVIEWS: Review[] = [
  {
    name: 'Marcus Reed',
    role: 'Founder, Northwind',
    text: 'Launch Peak felt like a real partner, not a vendor. They designed and built our app fast and it just works. Our activation jumped right after launch.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178628798_cfcc97aa.jpg',
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'CEO, Summit',
    text: 'Our new site helped us close our seed round. Tatiana understood the vision in one call and delivered work that looked twice our size. Five stars.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178637138_370f3be5.png',
    stars: 5,
  },
  {
    name: 'David Cho',
    role: 'Product Lead, Bloom',
    text: 'The design system they built saved us months. Everything is warm, clean, and consistent. Best money we spent this year.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178642321_d1619673.png',
    stars: 5,
  },
  {
    name: 'Elena Torres',
    role: 'COO, Harbor',
    text: 'Checkout conversions went up almost 30 percent. Clear communication, fast turnaround, and a team that actually cares about results.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178649648_8aa16b64.png',
    stars: 5,
  },
  {
    name: 'James Whitfield',
    role: 'Founder, Atlas',
    text: 'They take you from startup to summit for real. Thoughtful design, solid code, and a process that made the whole thing feel easy.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178638892_49bf597e.png',
    stars: 5,
  },
  {
    name: 'Sofia Marin',
    role: 'Director, Pine',
    text: 'Our field teams love the new app. Simple, fast, and reliable. Launch Peak listened closely and nailed it on the first round.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178656698_d1a2038a.png',
    stars: 5,
  },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Tatiana Rogel',
    role: 'Founder, Design + Dev',
    bio: 'UI/UX designer and web/mobile developer who loves taking founders from idea to launch.',
    avatar:
      'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178539219_bf7b634a.jpg',
  },
];

export interface FlowStep {
  goal: string;
  detail: string;
  icon: string;
}

// Flow of a client's business goals
export const CLIENT_FLOW: FlowStep[] = [
  {
    goal: 'Validate the idea',
    detail: 'Shape a clear concept and prototype to test with real users.',
    icon: 'Lightbulb',
  },
  {
    goal: 'Launch the product',
    detail: 'Ship a polished design and working build that earns trust fast.',
    icon: 'Rocket',
  },
  {
    goal: 'Win more customers',
    detail: 'Optimize conversion with high-performing pages and flows.',
    icon: 'TrendingUp',
  },
  {
    goal: 'Scale with confidence',
    detail: 'Grow on a solid design system and codebase built to last.',
    icon: 'Mountain',
  },
];

export interface ProcessStep {
  name: string;
  title: string;
  text: string;
}

export const PROCESS: ProcessStep[] = [
  {
    name: '01',
    title: 'Discovery',
    text: 'We start with a free call to understand your goals, users, and timeline.',
  },
  {
    name: '02',
    title: 'Design',
    text: 'We map flows and craft a warm, polished interface you can feel proud of.',
  },
  {
    name: '03',
    title: 'Build',
    text: 'We turn design into fast, clean, production-ready code.',
  },
  {
    name: '04',
    title: 'Launch + Scale',
    text: 'We ship, measure, and keep improving as you grow toward the summit.',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'How does pricing work?',
    a: 'Most projects are fixed scope with clear ranges. Design starts from $4k, web from $6k, and mobile from $9k. We send a simple proposal after our discovery call.',
  },
  {
    q: 'How long does a project take?',
    a: 'A focused landing page can take two weeks. A full product design and build usually runs six to twelve weeks depending on scope.',
  },
  {
    q: 'Do you work with global clients?',
    a: 'Yes. We are based in Portland, Oregon and work with clients across the US and around the world. Async friendly and timezone flexible.',
  },
  {
    q: 'What is it like to work together?',
    a: 'Friendly, clear, and fast. You get one partner who designs and builds, weekly updates, and no jargon. We treat your product like our own.',
  },
];

export const STATS = [
  { value: '40+', label: 'Products shipped' },
  { value: '4.9', label: 'Average client rating' },
  { value: '12+', label: 'Countries served' },
  { value: '100%', label: 'Design plus dev in house' },
];
