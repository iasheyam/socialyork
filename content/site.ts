/**
 * Single source of truth for every word and number on the marketing site.
 *
 * The section 0 replacement checklist in the build brief is executed by editing
 * THIS file only. Anything still unverified is written as a literal
 * `[DEMO: token]` string; the <Demo> renderer styles those so they read as
 * placeholder in the build. Replacing a token means swapping the string for the
 * real value.
 *
 * Do not move copy into JSX. Components read from here.
 */

export type Paragraph = string;

export interface ServiceSection {
  /** "01", "02" -- rendered in the mono eyebrow */
  index: string;
  /** short label after the index, e.g. "Content Marketing" */
  label: string;
  /** the large display line */
  title: string;
  /** running copy, one string per paragraph */
  body: Paragraph[];
}

export interface Creator {
  handle: string;
  vertical: string;
  followers: string;
}

export interface Reel {
  /** public Instagram permalink, e.g. https://www.instagram.com/reel/XXXX/ */
  url: string;
}

export interface Client {
  name: string;
  /** one number per client -- a redemption count or a platform metric, never an estimate */
  result: string;
  /** path under /public/logos once real logos land; null renders a name placeholder */
  logo: string | null;
}

export interface SiteContent {
  meta: {
    name: string;
    domain: string;
    title: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneHref: string;
  };
  /**
   * Long Island business address is on the contract. Per the brief it stays off
   * the site unless Isti says otherwise -- set this string to render it in the
   * footer, one line, no other change needed.
   */
  address: string | null;
  hero: {
    lines: [string, string];
    resolve: string;
    /** basenames in /public/video -- each exists as .webm, .mp4 and .jpg poster */
    clips: string[];
    /** [DEMO: hero-video] -- placeholder NYC footage; final is licensed stock */
    footageNote: string;
  };
  positioning: Paragraph[];
  services: ServiceSection[];
  /**
   * Reel carousel under Service 01. Uses Instagram's official embed, loaded only
   * when the section nears the viewport. Until Isti supplies real permalinks the
   * items are [DEMO: ...] tokens and render as placeholder slides.
   */
  reels: {
    label: string;
    note: string;
    items: Reel[];
  };
  network: {
    /** [DEMO: creator-handles] -- four sample cards. Handles are deliberately fake. */
    note: string;
    creators: Creator[];
  };
  guarantee: {
    index: string;
    label: string;
    title: string;
    body: Paragraph[];
  };
  clients: {
    label: string;
    lead: string;
    /** [DEMO: client-logos] */
    logoNote: string;
    items: Client[];
  };
  closing: {
    heading: string;
  };
}

const EMDASH = "—";

export const site: SiteContent = {
  meta: {
    name: "SocialYork",
    domain: "socialyork.com",
    title: `SocialYork ${EMDASH} We make sure your brand is heard`,
    description:
      "SocialYork produces content and runs an influencer network for New York businesses, on tracking codes you can count. We commit to a referred-client number in writing.",
  },
  contact: {
    email: "hello@socialyork.com",
    phone: "480 743 2551",
    phoneHref: "+14807432551",
  },
  address: null,

  hero: {
    lines: ["New York City is busy.", "Your brand needs to be heard."],
    resolve: "SocialYork. We make sure yours is.",
    clips: ["hero-01", "hero-02", "hero-03"],
    footageNote: "[DEMO: hero-video]",
  },

  positioning: [
    `Most businesses here aren't invisible because they're not good. They're invisible because nobody is producing for them at the volume the platforms demand ${EMDASH} and because posting is not the same as being seen.`,
    "We do both halves. We make the work, and we make sure it reaches people who walk through your door.",
  ],

  services: [
    {
      index: "01",
      label: "Content Marketing",
      title: "We produce, you don't.",
      body: [
        `We shoot on location at your business [DEMO: shoot-days] days a month and deliver [DEMO: content-volume] pieces of content across four pillars ${EMDASH} education, story, promotion, and photography. Captions, posting times, links, hashtags, and tracking codes come with every piece, scheduled in advance.`,
        "We run the accounts across Instagram, TikTok, and Facebook, or we hand you the library and the schedule and you run them. Either works.",
      ],
    },
    {
      index: "02",
      label: "Influencer Network",
      title: "A room full of people who already have the audience you want.",
      body: [
        `We work with a network of [DEMO: creator-count] creators across [DEMO: creator-verticals]. We match you to the ones whose audience overlaps yours, brief them, and run their posts on the same tracking codes as everything else ${EMDASH} so an influencer post is a number you can count, not a favor you hope worked.`,
      ],
    },
  ],

  reels: {
    label: "Recent work",
    note: "[DEMO: reels]",
    items: [
      { url: "[DEMO: reel-url-1]" },
      { url: "[DEMO: reel-url-2]" },
      { url: "[DEMO: reel-url-3]" },
      { url: "[DEMO: reel-url-4]" },
      { url: "[DEMO: reel-url-5]" },
    ],
  },

  network: {
    note: `Sample cards ${EMDASH} not live network data.`,
    creators: [
      { handle: "@demo.creator.one", vertical: "[DEMO: vertical]", followers: "[DEMO: 000K]" },
      { handle: "@demo.creator.two", vertical: "[DEMO: vertical]", followers: "[DEMO: 000K]" },
      { handle: "@demo.creator.three", vertical: "[DEMO: vertical]", followers: "[DEMO: 000K]" },
      { handle: "@demo.creator.four", vertical: "[DEMO: vertical]", followers: "[DEMO: 000K]" },
    ],
  },

  guarantee: {
    index: "03",
    label: "The Guarantee",
    title: "We commit to a number, in writing.",
    body: [
      `Every campaign runs on codes we issue. When someone redeems one, that's a client we sent you ${EMDASH} counted, not estimated.`,
      "Over a 90-day trial we commit to [DEMO: guarantee-number] referred clients. If we come up short, you get the difference back, pro rata. You can take it as a refund or convert it into service credit. It's in the contract, not the pitch.",
    ],
  },

  clients: {
    label: "Clients",
    lead: "Every number here is a redemption count or a platform metric. None of it is an estimate.",
    logoNote: "[DEMO: client-logos]",
    items: [
      { name: "Bon Bon Salon", result: "[DEMO: client-result-1]", logo: null },
      { name: "Catalia Beauty", result: "[DEMO: client-result-2]", logo: null },
      { name: "Spartan Grills", result: "[DEMO: client-result-3]", logo: null },
      { name: "IT Trattoria", result: "[DEMO: client-result-4]", logo: null },
    ],
  },

  closing: {
    heading: "The conversation already started in person.",
  },
};
