export type ArchiveStatus = "Owned" | "Wishlist" | "Sold";
export type ActivityBadge = "Added" | "Grail" | "Archived";
export type NavSection = "Journal" | "Showroom" | "Grails" | "Vault" | "Public";

export type WatchEntry = {
  id: string;
  brand: string;
  model: string;
  reference: string;
  status: ArchiveStatus;
  image: string;
  story: string;
  caseSize: number;
  movement: string;
  has3d?: boolean;
  year?: number;
  note?: string;
  acquisitionYear?: number;
  grailQuote?: string;
  labels?: string[];
};

export type ActivityEntry = {
  id: string;
  badge: ActivityBadge;
  description: string;
  relativeTime: string;
};

export type AppreciationEntry = {
  id: string;
  senderName: string;
  senderUsername: string;
  senderAvatarUrl: string;
  senderRole: string;
  reaction: string;
  watchId: string;
  watchLabel: string;
  comment: string;
  date: string;
};

export type CollectorPreview = {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  personality: string;
  statement: string;
  overlap: string;
  previewWatchIds: string[];
};

export type RecommendationEntry = {
  id: string;
  watchId: string;
  match: number;
  reason: string;
  primary?: boolean;
};

export type CommunityFeedEntry = {
  id: string;
  actorName: string;
  actorUsername: string;
  actorAvatarUrl: string;
  action: "Collection Update" | "Wishlist Move" | "Grail Call" | "Appreciation" | "Comment";
  title: string;
  body: string;
  href: string;
  watchId?: string;
  timestamp: string;
};

export type CommunityRatingEntry = {
  id: string;
  collectionLabel: string;
  collectorName: string;
  metrics: Array<{
    label: "Cohesion" | "Originality" | "Wearability" | "Depth" | "Grail Strength";
    value: number;
  }>;
  note: string;
};

export type CommunityCommentEntry = {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatarUrl: string;
  targetLabel: string;
  comment: string;
  href: string;
  timestamp: string;
};

export type CommunityNewsEntry = {
  id: string;
  title: string;
  label: string;
  summary: string;
  href: string;
};

export type TimelineEvent = {
  id: string;
  year: number;
  watchId: string;
  title: string;
  note: string;
  label: "First Watch" | "Daily Companion" | "Milestone Piece" | "Grail";
};

export type ScoreMetric = {
  label: string;
  value: number;
  note: string;
};

export type RotationEntry = {
  watchId: string;
  state: "Active" | "Resting";
  lastWorn: string;
  frequency: string;
  note: string;
};

export type FlowConfig = {
  route: string;
  title: string;
  section: NavSection;
  entryPoints: string[];
  primaryCta: string;
  secondaryCta: string;
};

export type Profile = {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  grail: WatchEntry;
  watches: WatchEntry[];
  activities: ActivityEntry[];
  stats: {
    owned: number;
    wishlist: number;
    sold: number;
    brands: number;
  };
  tasteProfile: {
    topBrand: string;
    personality: string;
    summary: string;
  };
  dossier: {
    personalityTitle: string;
    personalityBody: string;
    established: string;
    level: {
      title: string;
      level: string;
      progress: number;
      note: string;
      nextBadge: string;
    };
    brandAffinity: Array<{ label: string; value: number }>;
    caseSize: {
      average: number;
      smallest: number;
      largest: number;
    };
    metrics: Array<{ label: string; value: string; note: string }>;
  };
};

export const routeFlowConfig: FlowConfig[] = [
  {
    route: "/app/journal",
    title: "Journal",
    section: "Journal",
    entryPoints: ["Main navigation", "Public profile"],
    primaryCta: "Read Collection Story",
    secondaryCta: "View Appreciations",
  },
  {
    route: "/app/showroom",
    title: "Showroom",
    section: "Showroom",
    entryPoints: ["Main navigation", "Public profile CTA"],
    primaryCta: "Enter Showroom 2.0",
    secondaryCta: "Open Watch Detail",
  },
  {
    route: "/app/showroom-2",
    title: "Showroom 2.0",
    section: "Showroom",
    entryPoints: ["Showroom page", "Grail Ceremony CTA", "Public profile CTA"],
    primaryCta: "Open Watch Detail",
    secondaryCta: "Back to Showroom",
  },
  {
    route: "/app/grails",
    title: "Grails",
    section: "Grails",
    entryPoints: ["Main navigation", "Public profile grail CTA"],
    primaryCta: "Launch Grail Ceremony",
    secondaryCta: "Share Grail Moment",
  },
  {
    route: "/app/grail-ceremony",
    title: "Grail Ceremony",
    section: "Grails",
    entryPoints: ["Grails page", "Watch detail", "Public profile grail"],
    primaryCta: "View in Showroom",
    secondaryCta: "Share Moment",
  },
  {
    route: "/app/vault",
    title: "Vault",
    section: "Vault",
    entryPoints: ["User sign in", "Main navigation"],
    primaryCta: "Export Vault Archive",
    secondaryCta: "View Taste Profile",
  },
  {
    route: "/app/story",
    title: "My Collection Story",
    section: "Vault",
    entryPoints: ["Journal card", "Public profile CTA", "Vault timeline widget"],
    primaryCta: "View Journey Through Time",
    secondaryCta: "Enter Showroom",
  },
  {
    route: "/app/journey",
    title: "Journey Through Time",
    section: "Vault",
    entryPoints: ["Vault page", "Collection Story page", "Taste Profile card"],
    primaryCta: "Continue to Collection Story",
    secondaryCta: "Export Vault Archive",
  },
  {
    route: "/app/taste-profile",
    title: "Taste Profile",
    section: "Vault",
    entryPoints: ["Vault page", "Collection Score"],
    primaryCta: "Open Taste Engine",
    secondaryCta: "Export Archive PDF",
  },
  {
    route: "/app/taste-engine",
    title: "Taste Engine",
    section: "Vault",
    entryPoints: ["Journal recommendation card", "Vault analytics card", "Taste Profile CTA"],
    primaryCta: "Add to Wishlist",
    secondaryCta: "View Similar Collectors",
  },
  {
    route: "/app/similar-collectors",
    title: "Collectors With Similar Taste",
    section: "Journal",
    entryPoints: ["Journal discovery card", "Taste Engine CTA", "Public profile section"],
    primaryCta: "View Collection",
    secondaryCta: "Send Appreciation",
  },
  {
    route: "/app/appreciations",
    title: "Appreciations",
    section: "Journal",
    entryPoints: ["Journal page", "Public profile CTA", "Watch detail page"],
    primaryCta: "Reply With Appreciation",
    secondaryCta: "View Referenced Watch",
  },
  {
    route: "/app/rotation",
    title: "Current Rotation",
    section: "Vault",
    entryPoints: ["Vault page", "Profile daily companion", "Watch detail page"],
    primaryCta: "Mark as Worn Today",
    secondaryCta: "View Wear History",
  },
  {
    route: "/app/collection-score",
    title: "Collection Score",
    section: "Vault",
    entryPoints: ["Vault page", "Taste Profile page", "Profile stats section"],
    primaryCta: "View Taste Profile",
    secondaryCta: "Export Vault Archive",
  },
  {
    route: "/app/vault-export",
    title: "Vault Archive",
    section: "Vault",
    entryPoints: ["Vault page primary CTA", "Taste Profile page", "Journey page"],
    primaryCta: "Export Archive PDF",
    secondaryCta: "Open Collection Score",
  },
];

export const sectionRouteMap: Record<Exclude<NavSection, "Public">, string> = {
  Journal: "/app/journal",
  Showroom: "/app/showroom",
  Grails: "/app/grails",
  Vault: "/app/vault",
};

const watchImageMap = {
  "tissot-gentleman-quartz": "/images/watches/tissot-gentleman-quartz.png",
  "certina-ds-4": "/images/watches/certina-ds-4.png",
  "timex-marlin-chronograph": "/images/watches/timex-marlin-chronograph.png",
  "mido-ocean-star-39": "/images/watches/mido-ocean-star-39.png",
  "tudor-royal": "/images/watches/tudor-royal.png",
  "cartier-ronde-solo": "/images/watches/cartier-ronde-solo.png",
  "omega-seamaster-300m": "/images/watches/omega-seamaster-300m.png",
  "rolex-air-king": "/images/watches/rolex-air-king.png",
  "vacheron-constantin-fiftysix": "/images/watches/vacheron-constantin-fiftysix.png",
  "tissot-gentleman-powermatic-80": "/images/watches/tissot-gentleman-powermatic-80.png",
  "cartier-ronde-must": "/images/watches/cartier-ronde-must.png",
  "vacheron-constantin-fiftysix-complete-calendar":
    "/images/watches/vacheron-constantin-fiftysix-complete-calendar.png",
  "certina-ds-action": "/images/watches/certina-ds-action.png",
} as const;

const collectorAvatarMap = {
  "manuel-canelas-pais": "/images/collectors/manuel-canelas-pais.jpg",
  "adrian-thorne": "/images/collectors/adrian-thorne.jpg",
  "julian-mercer": "/images/collectors/julian-mercer.jpg",
  "elena-rossi": "/images/collectors/elena-rossi.jpg",
  "julian-thorne": "/images/collectors/julian-thorne.jpg",
  "elena-moretti": "/images/collectors/elena-moretti.jpg",
  "marcus-vane": "/images/collectors/marcus-vane.jpg",
} as const;

export const watchCatalog: WatchEntry[] = [
  {
    id: "tissot-gentleman-quartz",
    brand: "Tissot",
    model: "Gentleman Quartz",
    reference: "T127.410",
    status: "Owned",
    image: watchImageMap["tissot-gentleman-quartz"],
    story:
      "An understated daily anchor with enough polish to move easily between office hours and slower evenings.",
    caseSize: 40,
    movement: "Quartz",
    year: 2022,
    acquisitionYear: 2022,
    note: "The first watch that made the collection feel intentional rather than accidental.",
    labels: ["First Watch", "Daily Companion"],
  },
  {
    id: "certina-ds-4",
    brand: "Certina",
    model: "DS-4",
    reference: "C022.410",
    status: "Owned",
    image: watchImageMap["certina-ds-4"],
    story:
      "A robust companion built around confidence, legibility and the kind of durability that rewards frequent wear.",
    caseSize: 40,
    movement: "Quartz",
    year: 2024,
    acquisitionYear: 2024,
    note: "Proof that practicality and refinement can share the same wrist without compromise.",
    labels: ["Milestone Piece"],
  },
  {
    id: "timex-marlin-chronograph",
    brand: "Timex",
    model: "Marlin Chronograph",
    reference: "TW2W10400",
    status: "Wishlist",
    image: watchImageMap["timex-marlin-chronograph"],
    story:
      "A vintage-leaning chronograph choice that introduces playful proportion without departing from classical restraint.",
    caseSize: 40,
    movement: "Quartz Chronograph",
    year: 2026,
    note: "The accessible chronograph that would soften the archive with a touch of old-school theatre.",
  },
  {
    id: "mido-ocean-star-39",
    brand: "Mido",
    model: "Ocean Star 39",
    reference: "M026.907",
    status: "Wishlist",
    image: watchImageMap["mido-ocean-star-39"],
    story:
      "The future diver in the archive: compact, modern and clean enough to preserve the calm tone of the collection.",
    caseSize: 39,
    movement: "Automatic",
    year: 2026,
    has3d: true,
    note: "A diver chosen not for volume, but for proportion, confidence and quiet capability.",
  },
  {
    id: "tudor-royal",
    brand: "Tudor",
    model: "Royal",
    reference: "M28600",
    status: "Wishlist",
    image: watchImageMap["tudor-royal"],
    story:
      "A bridge piece between sport and dress, chosen for its integrated stance and quiet sense of authority.",
    caseSize: 38,
    movement: "Automatic",
    year: 2027,
    note: "A versatile hinge in the collection's narrative, where polish and wearability meet.",
  },
  {
    id: "cartier-ronde-solo",
    brand: "Cartier",
    model: "Ronde Solo de Cartier",
    reference: "WSRN0021",
    status: "Wishlist",
    image: watchImageMap["cartier-ronde-solo"],
    story:
      "A softer expression of classicism, adding Parisian elegance to a collection currently grounded in utility.",
    caseSize: 36,
    movement: "Automatic",
    year: 2027,
    note: "The first overtly dress-oriented move in the vault, still disciplined in its proportions.",
  },
  {
    id: "omega-seamaster-300m",
    brand: "Omega",
    model: "Seamaster 300M",
    reference: "210.30.42.20.01.001",
    status: "Wishlist",
    image: watchImageMap["omega-seamaster-300m"],
    story:
      "A modern icon with enough presence to act as a cornerstone acquisition when the collection leans more technical.",
    caseSize: 42,
    movement: "Automatic",
    year: 2028,
    has3d: true,
    note: "A decisive technical chapter, chosen for reliability, heritage and visual authority.",
  },
  {
    id: "rolex-air-king",
    brand: "Rolex",
    model: "Air-King",
    reference: "126900",
    status: "Wishlist",
    image: watchImageMap["rolex-air-king"],
    story:
      "An aviation-rooted oddity, valued here for its purposeful dial and the confidence of a non-obvious Rolex choice.",
    caseSize: 40,
    movement: "Automatic",
    year: 2028,
    note: "An unconventional pick that signals taste shaped by conviction rather than consensus.",
  },
  {
    id: "vacheron-constantin-fiftysix",
    brand: "Vacheron Constantin",
    model: "Fiftysix",
    reference: "4600E/000A-B442",
    status: "Wishlist",
    image: watchImageMap["vacheron-constantin-fiftysix"],
    story:
      "The long-horizon grail: balanced, warm and effortlessly refined without slipping into excess.",
    caseSize: 40,
    movement: "Automatic",
    year: 2029,
    note: "Chosen as the point where refinement, maturity and emotional resonance align.",
    grailQuote: "The moment the archive becomes inheritance.",
    labels: ["Grail"],
  },
];

export const manuelProfile: Profile = {
  id: "manuel-canelas-pais",
  username: "manuel-canelas-pais",
  name: "Manuel Canelas Pais",
  avatarUrl: collectorAvatarMap["manuel-canelas-pais"],
  bio: "A restrained Portuguese collection in the making, guided by versatile daily references and a quiet fascination for measured refinement.",
  location: "Porto, Portugal",
  watches: watchCatalog,
  grail: watchCatalog[8],
  activities: [
    {
      id: "activity-1",
      badge: "Added",
      description: "Added Tissot Gentleman Quartz to the collection archive.",
      relativeTime: "2 days ago",
    },
    {
      id: "activity-2",
      badge: "Grail",
      description: "Marked Vacheron Constantin Fiftysix as the current grail target.",
      relativeTime: "1 week ago",
    },
    {
      id: "activity-3",
      badge: "Added",
      description: "Documented Certina DS-4 as a core daily reference.",
      relativeTime: "2 weeks ago",
    },
  ],
  stats: {
    owned: 2,
    wishlist: 7,
    sold: 0,
    brands: 9,
  },
  tasteProfile: {
    topBrand: "Vacheron Constantin",
    personality: "Measured Modernist",
    summary:
      "Manuel's selections move with discipline: compact proportions, versatile silhouettes and a clear preference for watches that wear quietly but age with dignity.",
  },
  dossier: {
    personalityTitle: "Refined Everyday Traditionalist",
    personalityBody:
      "The collection reveals a collector who values clarity over noise. Utility comes first, but never without proportion, balance and a measured appetite for heritage-led design.",
    established: "2026",
    level: {
      title: "Connoisseur",
      level: "04",
      progress: 72,
      note: "Two to three disciplined acquisitions would complete a remarkably cohesive first chapter.",
      nextBadge: "Archival Specialist",
    },
    brandAffinity: [
      { label: "Tissot", value: 22 },
      { label: "Certina", value: 18 },
      { label: "Omega", value: 16 },
      { label: "Cartier", value: 14 },
      { label: "Vacheron Constantin", value: 30 },
    ],
    caseSize: {
      average: 39,
      smallest: 36,
      largest: 42,
    },
    metrics: [
      {
        label: "Market Value",
        value: "EUR 31.8K",
        note: "Projected value if the current grail path is completed with the same restraint.",
      },
      {
        label: "Wear Frequency",
        value: "4.6 Days/Wk",
        note: "The existing pair suggests a practical rotation with room for a future dress note.",
      },
      {
        label: "Servicing",
        value: "On Schedule",
        note: "Both active references remain low-friction, reinforcing the calm, usable character of the archive.",
      },
    ],
  },
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "timeline-1",
    year: 2022,
    watchId: "tissot-gentleman-quartz",
    title: "The first deliberate acquisition",
    note: "The Gentleman Quartz became the watch that defined the collection's baseline: clarity, composure and everyday legitimacy.",
    label: "First Watch",
  },
  {
    id: "timeline-2",
    year: 2024,
    watchId: "certina-ds-4",
    title: "A practical second chapter",
    note: "The DS-4 introduced resilience to the archive and made rotation feel like ritual instead of exception.",
    label: "Daily Companion",
  },
  {
    id: "timeline-3",
    year: 2028,
    watchId: "omega-seamaster-300m",
    title: "The technical milestone ahead",
    note: "A future milestone piece that would formalize Manuel's attraction to capable steel sports watches.",
    label: "Milestone Piece",
  },
  {
    id: "timeline-4",
    year: 2029,
    watchId: "vacheron-constantin-fiftysix",
    title: "The long-view grail",
    note: "The Fiftysix remains the emotional destination of the archive: warm, balanced and quietly final.",
    label: "Grail",
  },
];

export const recommendations: RecommendationEntry[] = [
  {
    id: "rec-1",
    watchId: "vacheron-constantin-fiftysix",
    match: 94,
    primary: true,
    reason:
      "Your archive consistently favors balanced proportions, steel restraint and watches that age with dignity. The Fiftysix sits precisely at that intersection.",
  },
  {
    id: "rec-2",
    watchId: "mido-ocean-star-39",
    match: 89,
    reason: "A strong match for your preference for 39mm steel watches with understated sporty energy.",
  },
  {
    id: "rec-3",
    watchId: "tudor-royal",
    match: 86,
    reason: "Bridges dress and sport in the same measured way your current curation already suggests.",
  },
  {
    id: "rec-4",
    watchId: "cartier-ronde-solo",
    match: 82,
    reason: "Adds refinement and softer geometry without disrupting the archive's calm sensibility.",
  },
];

export const similarCollectors: CollectorPreview[] = [
  {
    id: "collector-1",
    username: "adrian-thorne",
    name: "Adrian Thorne",
    avatarUrl: collectorAvatarMap["adrian-thorne"],
    personality: "The Purist",
    statement:
      "Drawn to proportion, restraint and legacy references that never need to announce themselves loudly.",
    overlap: "4 shared references",
    previewWatchIds: ["tissot-gentleman-quartz", "cartier-ronde-solo", "vacheron-constantin-fiftysix"],
  },
  {
    id: "collector-2",
    username: "julian-mercer",
    name: "Julian Mercer",
    avatarUrl: collectorAvatarMap["julian-mercer"],
    personality: "The Archivalist",
    statement:
      "Focused on provenance, longevity and the quiet authority of steel pieces built to be lived with.",
    overlap: "3 shared references",
    previewWatchIds: ["certina-ds-4", "mido-ocean-star-39", "omega-seamaster-300m"],
  },
  {
    id: "collector-3",
    username: "elena-rossi",
    name: "Elena Rossi",
    avatarUrl: collectorAvatarMap["elena-rossi"],
    personality: "The Complicationist",
    statement:
      "A collector of subtler intricacy, interested in refinement first and technical theatre second.",
    overlap: "2 shared references",
    previewWatchIds: ["tudor-royal", "cartier-ronde-solo", "vacheron-constantin-fiftysix"],
  },
];

export const appreciations: AppreciationEntry[] = [
  {
    id: "app-1",
    senderName: "Julian Thorne",
    senderUsername: "julian-thorne",
    senderAvatarUrl: collectorAvatarMap["julian-thorne"],
    senderRole: "Director at The Archive",
    reaction: "Excellent Taste",
    watchId: "tissot-gentleman-quartz",
    watchLabel: "Tissot Gentleman Quartz",
    comment:
      "There is something deeply reassuring about beginning a collection with a watch this disciplined. It sets the tone immediately.",
    date: "Mar 12, 2026",
  },
  {
    id: "app-2",
    senderName: "Elena Moretti",
    senderUsername: "elena-moretti",
    senderAvatarUrl: collectorAvatarMap["elena-moretti"],
    senderRole: "Independent Curator",
    reaction: "Understated Elegance",
    watchId: "cartier-ronde-solo",
    watchLabel: "Cartier Ronde Solo de Cartier",
    comment:
      "The Ronde Solo is such a measured choice. It broadens the archive without disturbing its calm voice.",
    date: "Feb 28, 2026",
  },
  {
    id: "app-3",
    senderName: "Marcus Vane",
    senderUsername: "marcus-vane",
    senderAvatarUrl: collectorAvatarMap["marcus-vane"],
    senderRole: "Vintage Specialist",
    reaction: "True Grail",
    watchId: "vacheron-constantin-fiftysix",
    watchLabel: "Vacheron Constantin Fiftysix",
    comment:
      "A grail chosen with maturity. It feels less like ambition and more like the inevitable destination of the collection.",
    date: "Feb 15, 2026",
  },
];

export const scoreBreakdown: ScoreMetric[] = [
  {
    label: "Diversity",
    value: 74,
    note: "A compact but increasingly varied mix of daily, dress and aspirational categories.",
  },
  {
    label: "Consistency",
    value: 91,
    note: "A remarkably coherent point of view centered on proportion, steel restraint and versatile elegance.",
  },
  {
    label: "Rarity",
    value: 65,
    note: "Measured ambition rather than immediate exclusivity, with rarity concentrated in the grail path.",
  },
  {
    label: "Condition",
    value: 88,
    note: "A disciplined archive built around modern, dependable pieces likely to age with grace.",
  },
  {
    label: "Personal Significance",
    value: 95,
    note: "Every piece already carries a clear role in the collector's own narrative.",
  },
];

export const rotationData: RotationEntry[] = [
  {
    watchId: "tissot-gentleman-quartz",
    state: "Active",
    lastWorn: "Today",
    frequency: "4.6x / wk",
    note: "The default choice when the day calls for clarity and zero friction.",
  },
  {
    watchId: "certina-ds-4",
    state: "Active",
    lastWorn: "Yesterday",
    frequency: "2.9x / wk",
    note: "Reserved for faster days when robustness matters more than ceremony.",
  },
  {
    watchId: "cartier-ronde-solo",
    state: "Resting",
    lastWorn: "Awaiting acquisition",
    frequency: "Future rotation",
    note: "Imagined already as the evening counterpoint to the collection's current practicality.",
  },
];

export const journalStories = [
  {
    id: "journal-1",
    title: "My Collection Story",
    route: "/app/story",
    summary: "A journey through time, taste, and craftsmanship told through the watches that shaped the archive.",
  },
  {
    id: "journal-2",
    title: "Appreciations",
    route: "/app/appreciations",
    summary: "Small notes of admiration from fellow collectors who understand the value of restraint.",
  },
  {
    id: "journal-3",
    title: "Taste Engine",
    route: "/app/taste-engine",
    summary: "Recommendations shaped by the exact silhouette, size and tone already emerging in the vault.",
  },
  {
    id: "journal-4",
    title: "Similar Collectors",
    route: "/app/similar-collectors",
    summary: "Quiet social discovery for collectors whose instincts feel closely aligned with yours.",
  },
];

export const communityFeed: CommunityFeedEntry[] = [
  {
    id: "feed-1",
    actorName: "Manuel Canelas Pais",
    actorUsername: "manuel-canelas-pais",
    actorAvatarUrl: collectorAvatarMap["manuel-canelas-pais"],
    action: "Wishlist Move",
    title: "Moved the Omega Seamaster 300M to the top of the active wishlist.",
    body: "A platform update should show not just what someone owns, but what they are actively prioritising next.",
    href: "/app/taste-engine",
    watchId: "omega-seamaster-300m",
    timestamp: "12 minutes ago",
  },
  {
    id: "feed-2",
    actorName: "Adrian Thorne",
    actorUsername: "adrian-thorne",
    actorAvatarUrl: collectorAvatarMap["adrian-thorne"],
    action: "Appreciation",
    title: "Left an appreciation on a compact steel-first collection.",
    body: "The strongest community loops should feel like thoughtful collector notes, not empty likes.",
    href: "/app/appreciations",
    watchId: "tissot-gentleman-powermatic-80",
    timestamp: "34 minutes ago",
  },
  {
    id: "feed-3",
    actorName: "Julian Mercer",
    actorUsername: "julian-mercer",
    actorAvatarUrl: collectorAvatarMap["julian-mercer"],
    action: "Comment",
    title: "Commented on the role of tool-watch energy inside a dress-leaning archive.",
    body: "Community conversation works best when it is attached to real collection decisions and taste tradeoffs.",
    href: "/app/journal",
    watchId: "mido-ocean-star-39",
    timestamp: "1 hour ago",
  },
  {
    id: "feed-4",
    actorName: "Elena Rossi",
    actorUsername: "elena-rossi",
    actorAvatarUrl: collectorAvatarMap["elena-rossi"],
    action: "Grail Call",
    title: "Marked one watch as the singular grail above the rest of the wishlist.",
    body: "The grail should feel categorically different from a normal target: less next purchase, more defining horizon.",
    href: "/app/grail-ceremony",
    watchId: "vacheron-constantin-fiftysix-complete-calendar",
    timestamp: "3 hours ago",
  },
];

export const communityRatings: CommunityRatingEntry[] = [
  {
    id: "rating-1",
    collectionLabel: "Measured Modernist",
    collectorName: "Manuel Canelas Pais",
    metrics: [
      { label: "Cohesion", value: 91 },
      { label: "Originality", value: 74 },
      { label: "Wearability", value: 88 },
      { label: "Depth", value: 68 },
      { label: "Grail Strength", value: 94 },
    ],
    note: "A tight collection logic with a very clear north star, even before the grail is acquired.",
  },
  {
    id: "rating-2",
    collectionLabel: "The Purist",
    collectorName: "Adrian Thorne",
    metrics: [
      { label: "Cohesion", value: 95 },
      { label: "Originality", value: 71 },
      { label: "Wearability", value: 84 },
      { label: "Depth", value: 72 },
      { label: "Grail Strength", value: 90 },
    ],
    note: "A disciplined archive where every acquisition already feels filtered through long-term taste.",
  },
];

export const communityComments: CommunityCommentEntry[] = [
  {
    id: "comment-1",
    authorName: "Elena Moretti",
    authorUsername: "elena-moretti",
    authorAvatarUrl: collectorAvatarMap["elena-moretti"],
    targetLabel: "Manuel's active wishlist",
    comment: "The platform should let a collector say: I like your wishlist, but your grail is where your taste really becomes clear.",
    href: "/app/appreciations",
    timestamp: "18 minutes ago",
  },
  {
    id: "comment-2",
    authorName: "Marcus Vane",
    authorUsername: "marcus-vane",
    authorAvatarUrl: collectorAvatarMap["marcus-vane"],
    targetLabel: "Julian's steel sports rotation",
    comment: "Ratings become interesting when they are structured. Cohesion and wearability tell me more than a generic score ever could.",
    href: "/app/collection-score",
    timestamp: "52 minutes ago",
  },
  {
    id: "comment-3",
    authorName: "Julian Thorne",
    authorUsername: "julian-thorne",
    authorAvatarUrl: collectorAvatarMap["julian-thorne"],
    targetLabel: "A grail ceremony post",
    comment: "A grail is the watch that explains the collection, not just the watch with the highest price.",
    href: "/app/grail-ceremony",
    timestamp: "2 hours ago",
  },
];

export const communityNews: CommunityNewsEntry[] = [
  {
    id: "news-1",
    label: "New Model",
    title: "Collectors are bookmarking compact steel sports references again.",
    summary: "A live community homepage should surface what people are adding to watchlists right now, not just static profile data.",
    href: "/app/taste-engine",
  },
  {
    id: "news-2",
    label: "Community Pick",
    title: "This week's strongest grail signal is still the Vacheron Fiftysix.",
    summary: "Good community design makes it obvious when a watch has moved beyond wishlist status and become a true grail.",
    href: "/app/grails",
  },
  {
    id: "news-3",
    label: "Conversation",
    title: "Structured collection ratings are outperforming generic likes.",
    summary: "Collectors respond better to cohesion, originality and wearability than to empty vanity metrics.",
    href: "/app/collection-score",
  },
];

function createMockCollectorProfile(input: {
  id: string;
  username: string;
  name: string;
  location: string;
  bio: string;
  topBrand: string;
  personality: string;
  grail: WatchEntry;
  owned: WatchEntry[];
  wishlist: WatchEntry[];
}) {
  const watches = [...input.owned, ...input.wishlist];
  return {
    id: input.id,
    username: input.username,
    name: input.name,
    avatarUrl: collectorAvatarMap[input.username as keyof typeof collectorAvatarMap] ?? "",
    bio: input.bio,
    location: input.location,
    grail: input.grail,
    watches,
    activities: [
      {
        id: `${input.id}-activity-1`,
        badge: "Added" as const,
        description: `Added ${input.owned[0]?.model ?? input.grail.model} to the collection archive.`,
        relativeTime: "5 days ago",
      },
      {
        id: `${input.id}-activity-2`,
        badge: "Grail" as const,
        description: `Flagged ${input.grail.model} as the defining long-term grail.`,
        relativeTime: "2 weeks ago",
      },
    ],
    stats: {
      owned: input.owned.length,
      wishlist: input.wishlist.length,
      sold: 0,
      brands: new Set(watches.map((watch) => watch.brand)).size,
    },
    tasteProfile: {
      topBrand: input.topBrand,
      personality: input.personality,
      summary: `${input.name.split(" ")[0]}'s archive reflects a similarly deliberate eye, with emphasis on proportion, mood and long-term coherence.`,
    },
    dossier: {
      personalityTitle: input.personality,
      personalityBody:
        "A quieter profile shaped by considered additions, coherent silhouettes and a clear taste for watches that reward close attention.",
      established: "2026",
      level: {
        title: "Connoisseur",
        level: "03",
        progress: 68,
        note: "An archive still evolving, but already anchored by conviction rather than volume.",
        nextBadge: "Archival Specialist",
      },
      brandAffinity: [
        { label: input.topBrand, value: 32 },
        { label: input.grail.brand, value: 24 },
        { label: input.owned[0]?.brand ?? input.topBrand, value: 18 },
      ],
      caseSize: {
        average: 39,
        smallest: 36,
        largest: 41,
      },
      metrics: [
        {
          label: "Market Value",
          value: "EUR 44.0K",
          note: "A mature but still selective profile with room for further refinement.",
        },
        {
          label: "Wear Frequency",
          value: "3.8 Days/Wk",
          note: "A collection with clear favorites and a strong sense of ritualized wear.",
        },
        {
          label: "Servicing",
          value: "On Schedule",
          note: "An orderly archive shaped by maintainability as much as acquisition taste.",
        },
      ],
    },
  } satisfies Profile;
}

const adrianProfile = createMockCollectorProfile({
  id: "adrian-thorne",
  username: "adrian-thorne",
  name: "Adrian Thorne",
  location: "London, United Kingdom",
  bio: "A purist archive built on restraint, legacy references and the discipline of never over-curating a good idea.",
  topBrand: "Vacheron Constantin",
  personality: "The Purist",
  owned: [
    {
      id: "adrian-gentleman",
      brand: "Tissot",
      model: "Gentleman Powermatic 80",
      reference: "T127.407",
      status: "Owned",
      image: watchImageMap["tissot-gentleman-powermatic-80"],
      story: "A quiet steel daily chosen for proportion first and branding second.",
      caseSize: 40,
      movement: "Automatic",
    },
    {
      id: "adrian-cartier-ronde",
      brand: "Cartier",
      model: "Ronde Must",
      reference: "WSRN0032",
      status: "Owned",
      image: watchImageMap["cartier-ronde-must"],
      story: "A dress counterpoint that never disturbs the archive's balance.",
      caseSize: 36,
      movement: "Automatic",
    },
  ],
  wishlist: [
    {
      id: "adrian-fiftysix",
      brand: "Vacheron Constantin",
      model: "Fiftysix",
      reference: "4600E/000A-B442",
      status: "Wishlist",
      image: watchImageMap["vacheron-constantin-fiftysix"],
      story: "The grail of the archive: warm, poised and emotionally inevitable.",
      caseSize: 40,
      movement: "Automatic",
    },
  ],
  grail: {
    id: "adrian-fiftysix",
    brand: "Vacheron Constantin",
    model: "Fiftysix",
    reference: "4600E/000A-B442",
    status: "Wishlist",
    image: watchImageMap["vacheron-constantin-fiftysix"],
    story: "A destination piece chosen for composure rather than spectacle.",
    caseSize: 40,
    movement: "Automatic",
  },
});

const julianProfile = createMockCollectorProfile({
  id: "julian-mercer",
  username: "julian-mercer",
  name: "Julian Mercer",
  location: "Zurich, Switzerland",
  bio: "An archivalist of functional steel watches and references whose real beauty appears over years of use.",
  topBrand: "Omega",
  personality: "The Archivalist",
  owned: [
    {
      id: "julian-certina",
      brand: "Certina",
      model: "DS Action",
      reference: "C032.807",
      status: "Owned",
      image: watchImageMap["certina-ds-action"],
      story: "Chosen for resilience, legibility and the honest pleasure of dependable steel.",
      caseSize: 38,
      movement: "Automatic",
    },
    {
      id: "julian-ocean-star",
      brand: "Mido",
      model: "Ocean Star 39",
      reference: "M026.907",
      status: "Owned",
      image: watchImageMap["mido-ocean-star-39"],
      story: "A diver with just enough reserve in its proportions to stay graceful.",
      caseSize: 39,
      movement: "Automatic",
    },
  ],
  wishlist: [
    {
      id: "julian-seamaster",
      brand: "Omega",
      model: "Seamaster 300M",
      reference: "210.30.42.20.01.001",
      status: "Wishlist",
      image: watchImageMap["omega-seamaster-300m"],
      story: "The future technical milestone, pursued for heritage as much as capability.",
      caseSize: 42,
      movement: "Automatic",
    },
  ],
  grail: {
    id: "julian-seamaster",
    brand: "Omega",
    model: "Seamaster 300M",
    reference: "210.30.42.20.01.001",
    status: "Wishlist",
    image: watchImageMap["omega-seamaster-300m"],
    story: "A grail defined by trustworthiness, engineering and calm presence.",
    caseSize: 42,
    movement: "Automatic",
  },
});

const elenaProfile = createMockCollectorProfile({
  id: "elena-rossi",
  username: "elena-rossi",
  name: "Elena Rossi",
  location: "Milan, Italy",
  bio: "A collector of elegant complications who values refinement before theatrics and heritage before novelty.",
  topBrand: "Cartier",
  personality: "The Complicationist",
  owned: [
    {
      id: "elena-tudor-royal",
      brand: "Tudor",
      model: "Royal",
      reference: "M28600",
      status: "Owned",
      image: watchImageMap["tudor-royal"],
      story: "An integrated bridge between dress and sport, chosen for poise.",
      caseSize: 38,
      movement: "Automatic",
    },
    {
      id: "elena-cartier-ronde",
      brand: "Cartier",
      model: "Ronde Solo de Cartier",
      reference: "WSRN0021",
      status: "Owned",
      image: watchImageMap["cartier-ronde-solo"],
      story: "Parisian restraint as a foundational gesture in the archive.",
      caseSize: 36,
      movement: "Automatic",
    },
  ],
  wishlist: [
    {
      id: "elena-fiftysix",
      brand: "Vacheron Constantin",
      model: "Fiftysix Complete Calendar",
      reference: "4000E/000A-B548",
      status: "Wishlist",
      image: watchImageMap["vacheron-constantin-fiftysix-complete-calendar"],
      story: "A grail complication with the same quiet voice as the rest of the archive.",
      caseSize: 40,
      movement: "Automatic",
    },
  ],
  grail: {
    id: "elena-fiftysix",
    brand: "Vacheron Constantin",
    model: "Fiftysix Complete Calendar",
    reference: "4000E/000A-B548",
    status: "Wishlist",
    image: watchImageMap["vacheron-constantin-fiftysix-complete-calendar"],
    story: "A mature grail chosen for poise, balance and complication density without noise.",
    caseSize: 40,
    movement: "Automatic",
  },
});

export const profiles = [manuelProfile, adrianProfile, julianProfile, elenaProfile];

export function getProfileByUsername(username: string) {
  return profiles.find((profile) => profile.username === username);
}

export function getWatchById(id: string) {
  return watchCatalog.find((watch) => watch.id === id);
}

export function getRouteFlow(route: string) {
  return routeFlowConfig.find((item) => item.route === route);
}

export function getSectionRoute(section: NavSection) {
  if (section === "Public") {
    return "/manuel-canelas-pais";
  }
  return sectionRouteMap[section];
}
