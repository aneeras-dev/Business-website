import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  MessageSquareQuote,
  Plane,
  Search,
  Star,
  TrendingUp,
  UserCheck,
  Utensils,
} from "lucide-react";

export const SITE = {
  name: "TripKnot Business",
  brand: "TripKnot",
  url: "https://business.tripknot.in",
  domain: "tripknot.in",
  email: "partners@tripknot.in",
  /** E.164, for tel: links and structured data. */
  phone: "+918428166373",
  phoneDisplay: "+91 84281 66373",
  address: "Puducherry, India",
  city: "Puducherry",
  country: "India",
} as const;

/* ------------------------------------------------------------------ seo -- */

/** Page-level copy, shared by the metadata block and the JSON-LD graph. */
export const SEO = {
  title: "TripKnot Business | Grow Your Hotel, Restaurant or Travel Agency",
  description:
    "Join TripKnot Business and reach more travelers. Create a free listing, generate leads, receive bookings, and grow your tourism business.",
  /** One-sentence answer to "what is this", for answer engines. */
  summary:
    "TripKnot Business is a listing and lead-generation platform for hotels, restaurants, and travel agencies in India. Businesses create a profile, get discovered by travelers planning trips, and receive enquiries directly with no commission on bookings.",
  keywords: [
    "tripknot business",
    "hotel listing platform",
    "travel agency marketing",
    "restaurant listing platform",
    "tourism business growth",
    "hotel lead generation",
    "travel booking platform",
    "restaurant promotion",
  ],
} as const;

/* ---------------------------------------------------------------- stats -- */

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};

export const STATS: Stat[] = [
  { label: "Travelers", value: 1000, suffix: "+" },
  { label: "Monthly Searches", value: 500, suffix: "+" },
  { label: "Partner Businesses", value: 50, suffix: "+" },
  { label: "Destinations", value: 200, suffix: "+" },
];

/* ----------------------------------------------------------- categories -- */

export type CategoryId = "hotels" | "restaurants" | "agencies";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: LucideIcon;
  benefits: string[];
  cta: string;
  /** Tailwind classes keyed per category so each card owns a distinct accent. */
  accent: {
    text: string;
    chip: string;
    hover: string;
  };
};

export const CATEGORIES: Category[] = [
  {
    id: "hotels",
    name: "Hotels & Stays",
    tagline: "Fill more rooms, in every season.",
    icon: Building2,
    benefits: [
      "Direct Booking Requests",
      "Higher Occupancy",
      "Better Online Visibility",
      "Showcase Rooms & Amenities",
    ],
    cta: "Join as Hotel Partner",
    accent: {
      text: "text-teal-600",
      chip: "bg-teal-600/10 text-teal-600",
      hover: "group-hover:border-teal-600/35",
    },
  },
  {
    id: "restaurants",
    name: "Food & Restaurants",
    tagline: "Be the table travelers book first.",
    icon: Utensils,
    benefits: [
      "Attract Tourists Nearby",
      "Showcase Menus",
      "Get More Reservations",
      "Improve Discoverability",
    ],
    cta: "Join as Restaurant Partner",
    accent: {
      text: "text-rust-600",
      chip: "bg-rust-600/10 text-rust-600",
      hover: "group-hover:border-rust-600/35",
    },
  },
  {
    id: "agencies",
    name: "Travel Agencies",
    tagline: "Sell every seat on every trip.",
    icon: Plane,
    benefits: [
      "Sell Packages",
      "Generate Leads",
      "Promote Group Trips",
      "Reach New Travelers",
    ],
    cta: "Join as Travel Partner",
    accent: {
      text: "text-moss-600",
      chip: "bg-moss-600/10 text-moss-600",
      hover: "group-hover:border-moss-600/35",
    },
  },
];

/* ------------------------------------------------------------- features -- */

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  chip: string;
};

export const FEATURES: Feature[] = [
  {
    title: "More Visibility",
    description:
      "Appear in destination searches the moment a traveler starts planning a trip to your city.",
    icon: Search,
    chip: "bg-teal-600/10 text-teal-600",
  },
  {
    title: "Qualified Leads",
    description:
      "Reach travelers actively planning trips, not cold traffic that never converts.",
    icon: UserCheck,
    chip: "bg-teal-600/10 text-teal-600",
  },
  {
    title: "Better SEO Presence",
    description:
      "Get indexed on Google with a fast, structured business profile that ranks for your name.",
    icon: TrendingUp,
    chip: "bg-moss-600/10 text-moss-600",
  },
  {
    title: "Direct Customer Enquiries",
    description:
      "Receive leads directly by WhatsApp, email, or phone. No middleman, no commission cut.",
    icon: MessageSquareQuote,
    chip: "bg-rust-600/10 text-rust-600",
  },
  {
    title: "Reviews & Trust",
    description:
      "Build credibility with verified traveler reviews that turn browsers into bookings.",
    icon: Star,
    chip: "bg-rust-600/10 text-rust-600",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track views, leads, and conversion so you know exactly what your listing is earning.",
    icon: BarChart3,
    chip: "bg-teal-600/10 text-teal-600",
  },
];

/* ---------------------------------------------------------------- steps -- */

export type Step = {
  n: string;
  title: string;
  description: string;
};

export const STEPS: Step[] = [
  {
    n: "01",
    title: "Create Business Profile",
    description:
      "Sign up in under two minutes and claim your business on TripKnot. No card required.",
  },
  {
    n: "02",
    title: "Add Photos & Details",
    description:
      "Upload photos, amenities, menus, or packages. Our team reviews and verifies your listing.",
  },
  {
    n: "03",
    title: "Get Discovered by Travelers",
    description:
      "Your profile goes live across destination pages, search results, and category listings.",
  },
  {
    n: "04",
    title: "Receive Leads & Bookings",
    description:
      "Enquiries land straight in your inbox, with traveler dates, group size, and intent.",
  },
  {
    n: "05",
    title: "Grow Revenue",
    description:
      "Use analytics to double down on what works and turn seasonal traffic into steady income.",
  },
];

/* -------------------------------------------------------------- pricing -- */

export type Plan = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  cta: string;
  badge?: string;
  featured?: boolean;
};

export const PRICING: Record<CategoryId, Plan[]> = {
  hotels: [
    {
      name: "Free Listing",
      price: 0,
      tagline: "Get on the map and start showing up in destination searches.",
      features: [
        "Free Hotel Listing",
        "Property Name, Category, Check-in Hours & Address",
        "2 Property Photos",
        "Basic Property Description",
        "Basic Search & Discover Placement",
        "Monthly Views & Saves",
        "Paid Promotional Push Notifications",
        "Basic Property Profile Management",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Essential",
      price: 899,
      tagline: "For properties ready to turn visibility into booked rooms.",
      features: [
        "Everything in Free",
        "Full Analytics Dashboard (Views, Saves, Map Clicks, Direction Taps)",
        "Weekly Performance Trends",
        "Enhanced Listing with Photo Carousel",
        "Up to 4 Room Types with Up to 15 Photos of Rooms",
        "2 Free Promotional Push Campaigns/Month",
        "Additional Paid Push Campaigns",
        "Location/Radius Targeting",
        "Room Offers & Deals",
        "Better Listing Presentation",
      ],
      cta: "Start Essential",
      badge: "Most Popular",
      featured: true,
    },
    {
      name: "Growth",
      price: 1499,
      tagline: "Maximum reach for properties competing on every search.",
      features: [
        "Everything in Essential",
        "Priority Ranking in Discover",
        "Priority Ranking in Map Results",
        "5 Free Promotional Push Campaigns/Month",
        "Additional Paid Campaigns",
        "Geo-Targeted Campaigns (Location, Radius, Travel Dates, Interests)",
        "Featured Placement on Home Pages",
        "Verified Hotel Badge",
        "Advanced Analytics",
        "Premium Property Visibility",
        "Listing in Itinerary Recommendations",
        "Priority Support",
      ],
      cta: "Start Growth",
    },
  ],
  restaurants: [
    {
      name: "Free Listing",
      price: 0,
      tagline: "Let nearby travelers find your restaurant before they arrive.",
      features: [
        "Free Restaurant Listing",
        "Restaurant Name, Cuisine, Hours & Address",
        "2 Restaurant Photos",
        "Basic Restaurant Description",
        "Basic Search & Discover Placement",
        "Monthly Views & Saves",
        "Paid Promotional Push Notifications",
        "Basic Restaurant Profile Management",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Essential",
      price: 799,
      tagline: "Put your menu in front of hungry tourists nearby.",
      features: [
        "Everything in Free",
        "Full Analytics Dashboard (Views, Saves, Map Clicks, Direction Taps)",
        "Weekly Performance Trends",
        "Enhanced Listing with Photo Carousel",
        "Menu Showcase with Up to 15 Dish Photos",
        "Highlight Tags (Must Try, Hidden Gem, Traveler Favorite)",
        "2 Free Promotional Push Campaigns/Month",
        "Additional Paid Push Campaigns",
        "Location/Radius Targeting",
        "Meal Offers & Deals",
        "Better Listing Presentation",
      ],
      cta: "Start Essential",
      badge: "Most Popular",
      featured: true,
    },
    {
      name: "Growth",
      price: 1399,
      tagline: "Own the food category in your destination.",
      features: [
        "Everything in Essential",
        "Priority Ranking in Discover",
        "Priority Ranking in Map Results",
        "5 Free Promotional Push Campaigns/Month",
        "Additional Paid Campaigns",
        "Geo-Targeted Campaigns (Location, Radius, Travel Dates, Interests)",
        "Featured Placement on Home Pages",
        "Verified Restaurant Badge",
        "Advanced Analytics",
        "Premium Restaurant Visibility",
        "Listing in Itinerary Recommendations",
        "Priority Support",
      ],
      cta: "Start Growth",
    },
  ],
  agencies: [
    {
      name: "Free Listing",
      price: 0,
      tagline: "Publish your agency and list your first packages free.",
      features: [
        "Free Agency Listing",
        "Agency Name, Specialty, Hours & Address",
        "2 Agency Photos",
        "Basic Agency Description",
        "Basic Search & Discover Placement",
        "Monthly Views & Saves",
        "Paid Promotional Push Notifications",
        "Basic Agency Profile Management",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Essential",
      price: 999,
      tagline: "A steady pipeline of travelers planning their next trip.",
      features: [
        "Everything in Free",
        "Full Analytics Dashboard (Views, Saves, Map Clicks, Direction Taps)",
        "Weekly Performance Trends",
        "Enhanced Listing with Photo Carousel",
        "Up to 4 Package Listings with Up to 15 Photos Each",
        "Highlight Tags (Bestseller, Hidden Gem, Traveler Favorite)",
        "2 Free Promotional Push Campaigns/Month",
        "Additional Paid Push Campaigns",
        "Location/Radius Targeting",
        "Package Offers & Deals",
        "Better Listing Presentation",
        "Priority Support",
      ],
      cta: "Start Essential",
      badge: "Most Popular",
      featured: true,
    },
    {
      name: "Growth",
      price: 1699,
      tagline: "Premium placement for agencies scaling group departures.",
      features: [
        "Everything in Essential",
        "Priority Ranking in Discover",
        "Priority Ranking in Map Results",
        "5 Free Promotional Push Campaigns/Month",
        "Additional Paid Campaigns",
        "Geo-Targeted Campaigns (Location, Radius, Travel Dates, Interests)",
        "Featured Placement on Home Pages",
        "Verified Agency Badge",
        "Advanced Analytics",
        "Premium Agency Visibility",
        "Premium Support",
      ],
      cta: "Start Growth",
    },
  ],
};

export type ComparisonRow = {
  feature: string;
  /** The cheapest tier this feature first appears in — it carries into every tier above it. */
  from: "free" | "essential" | "growth";
};

const TIER_ORDER = ["free", "essential", "growth"] as const;

/** A plan's own bullet list carries an "Everything in X" line — the comparison table replaces that with a section header instead. */
function withoutCarryoverLine(features: string[]): string[] {
  return features.filter((feature) => !feature.startsWith("Everything in "));
}

/**
 * Derives the full feature-comparison matrix for a category directly from
 * `PRICING`, so the comparison table can never drift from the plan cards.
 */
export function getComparisonRows(categoryId: CategoryId): ComparisonRow[] {
  const [free, essential, growth] = PRICING[categoryId];
  return [
    ...withoutCarryoverLine(free.features).map(
      (feature): ComparisonRow => ({ feature, from: "free" })
    ),
    ...withoutCarryoverLine(essential.features).map(
      (feature): ComparisonRow => ({ feature, from: "essential" })
    ),
    ...withoutCarryoverLine(growth.features).map(
      (feature): ComparisonRow => ({ feature, from: "growth" })
    ),
  ];
}

/** Whether a row (first available at `row.from`) is included at `tier`. */
export function isIncludedAt(row: ComparisonRow, tier: ComparisonRow["from"]): boolean {
  return TIER_ORDER.indexOf(row.from) <= TIER_ORDER.indexOf(tier);
}

/** Human labels for each category id, shared by schema, llms.txt, and the UI. */
export const BUSINESS_TYPE_LABELS: Record<CategoryId, string> = {
  hotels: "Hotels & Stays",
  restaurants: "Restaurants",
  agencies: "Travel Agencies",
};

export const PRICING_TABS: { id: CategoryId; label: string; icon: LucideIcon }[] = [
  { id: "hotels", label: "Hotels & Stays", icon: Building2 },
  { id: "restaurants", label: "Restaurants", icon: Utensils },
  { id: "agencies", label: "Travel Agencies", icon: Plane },
];

/* --------------------------------------------------------- testimonials -- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
  accent: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "In just 2 months, TripKnot brought us more direct enquiries than any listing platform.",
    name: "Rajesh Menon",
    role: "Owner, Backwater Retreat",
    location: "Alleppey, Kerala",
    initials: "RM",
    accent: "bg-teal-600",
  },
  {
    quote: "Tourists now find us before they arrive.",
    name: "Anitha Krishnan",
    role: "Co-founder, Spice Route Kitchen",
    location: "Fort Kochi, Kerala",
    initials: "AK",
    accent: "bg-rust-600",
  },
  {
    quote: "Our group trip bookings increased significantly.",
    name: "Vikram Shetty",
    role: "Director, Coastline Journeys",
    location: "Panaji, Goa",
    initials: "VS",
    accent: "bg-moss-600",
  },
];

/* ------------------------------------------------------------------ faq -- */

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "How does TripKnot help my business?",
    answer:
      "TripKnot puts your business in front of travelers at the exact moment they are planning a trip to your destination. Your profile appears on destination pages, in category listings, and in search results, so travelers discover you while they are still deciding where to stay, eat, and book. Every enquiry comes to you directly, and there is no commission on the business you win.",
  },
  {
    question: "Can I start with a free listing?",
    answer:
      "Yes. The Free Listing plan is free forever and needs no credit card. You get a verified business profile, your contact details, photos, and inclusion in destination discovery. Most partners start free, see the traffic for themselves, and upgrade once the enquiries start arriving.",
  },
  {
    question: "Can I upgrade anytime?",
    answer:
      "You can upgrade, downgrade, or switch plans at any time from your dashboard, and the change takes effect immediately. When you upgrade mid-cycle we pro-rate the difference, so you only pay for what you actually use.",
  },
  {
    question: "Do I receive direct customer enquiries?",
    answer:
      "Yes. Traveler enquiries are delivered straight to you by email, WhatsApp, and your dashboard, including their travel dates, group size, and what they are looking for. You reply and close the booking on your own terms. TripKnot never sits between you and your customer.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No lock-in and no long-term contract. Paid plans are billed monthly and you can cancel whenever you like. Your listing simply reverts to the Free plan at the end of the billing period, so you never lose your profile or your reviews.",
  },
];

/* ------------------------------------------------------------------ nav -- */

export const NAV_LINKS = [
  { href: "/#categories", label: "Who it is for" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];
