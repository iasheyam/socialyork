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
  /** cover image under /public/reels -- clicking the card opens `url` on Instagram */
  cover: string;
}

export interface Client {
  name: string;
  /** neighbourhood or street, shown under the name */
  location: string | null;
  /**
   * Headline result, rendered as a gold stat block. null shows just the name,
   * location and reel. Numbers must be measured, never estimated.
   */
  result: {
    /** the number itself, e.g. "+$100" or "3x" */
    stat: string;
    /** what it measures, e.g. "average ticket -- last 3 months" */
    caption: string;
    /** one or two plain sentences of context */
    story: string;
  } | null;
  /** path under /public/logos once real logos land; null renders a name placeholder */
  logo: string | null;
  /**
   * Embed URL for the reel shown above the name (9:16). Currently Google Drive
   * `/preview` links, e.g. https://drive.google.com/file/d/<id>/preview.
   * null renders a placeholder frame.
   */
  video: string | null;
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
   * Reel carousel under Service 01. Each slide is a self-hosted cover image that
   * links out to the reel on Instagram -- no Instagram embed, no third-party JS.
   * Covers live in /public/reels.
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
  /**
   * Secondary capabilities listed after Service 02. Kept deliberately light --
   * name, one-line subtitle, and a line icon each. Not one of the two flagship
   * services, so no index and no display headline per item.
   * `icon` is a key into ICONS in components/sections/OtherServices.tsx.
   */
  otherServices: {
    label: string;
    lead: string;
    items: { name: string; subtitle: string; icon: string }[];
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
      "Content and an influencer network for New York businesses, run on tracking codes you can count. We commit to a referred-client number in writing.",
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
    `You're not invisible because you're not good. You're invisible because nobody's producing for you at the volume the platforms reward ${EMDASH} and posting isn't the same as being seen.`,
    "We make the work, and we make sure it reaches people who'll walk through your door.",
  ],

  services: [
    {
      index: "01",
      label: "Content Marketing",
      title: "We produce, you don't.",
      body: [
        `We produce [DEMO: content-volume] pieces a month and keep your channels posting ${EMDASH} so the business gets seen without you touching a camera or a caption.`,
        "We run the accounts across Instagram, TikTok, and Facebook, or hand you the library to run yourself.",
      ],
    },
    {
      index: "02",
      label: "Influencer Network",
      title: "A room full of people who already have the audience you want.",
      body: [
        `[DEMO: creator-count] creators across [DEMO: creator-verticals]. We match you to the ones whose followers are already your customers and run their posts on your tracking codes ${EMDASH} a number you can count, not a favor you hope worked.`,
      ],
    },
  ],

  reels: {
    label: "Recent work",
    note: "",
    items: [
      { url: "https://www.instagram.com/p/DcbjJxPiVjT/", cover: "/reels/reel-01.jpg" },
      { url: "https://www.instagram.com/p/DbwRn7FTfW1/", cover: "/reels/reel-02.jpg" },
      { url: "https://www.instagram.com/p/DcJuhblD_v8/", cover: "/reels/reel-03.jpg" },
      { url: "https://www.instagram.com/p/DcOrIscEZfr/", cover: "/reels/reel-04.jpg" },
      { url: "https://www.instagram.com/p/DcbjL2pkQA_/", cover: "/reels/reel-05.jpg" },
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

  otherServices: {
    label: "Other services",
    lead: "We also handle:",
    items: [
      {
        name: "Website development",
        subtitle: "Sites that turn your content's traffic into customers.",
        icon: "code",
      },
      {
        name: "Google Business Profile",
        subtitle: "Set up and maintained so you show in local search and Maps.",
        icon: "pin",
      },
      {
        name: "AI automation",
        subtitle: `Replies, follow-ups, and scheduling ${EMDASH} automated.`,
        icon: "sparkle",
      },
      {
        name: "Paid advertising",
        subtitle: "Meta and Google campaigns, on the same tracking codes.",
        icon: "megaphone",
      },
    ],
  },

  guarantee: {
    index: "03",
    label: "The Guarantee",
    title: "We commit to a number, in writing.",
    body: [
      `Every campaign runs on codes we issue. A redeemed code is a client we sent you ${EMDASH} counted, not estimated.`,
      `Over a 90-day trial we commit to [DEMO: guarantee-number] referred clients. Come up short and you get the difference back, pro rata ${EMDASH} as a refund or service credit. It's in the contract, not the pitch.`,
    ],
  },

  clients: {
    label: "Clients",
    lead: "Measured numbers, from their books and ad accounts. Nothing estimated.",
    logoNote: "[DEMO: client-logos]",
    items: [
      {
        name: "Bon Bon Salon and Spa",
        location: "Madison Ave, Manhattan, New York",
        result: {
          stat: "+$100",
          caption: "average ticket — last 3 months",
          story:
            "We turned Bon Bon's offline reputation into an online following, then into repeat business — more visits, higher spend each time. All organic, no ad budget.",
        },
        logo: null,
        video:
          "https://drive.google.com/file/d/1zPjXJBhlfm8ybJPwAQyh7mEJRnmCpcun/preview",
      },
      {
        name: "Century Beauty Group",
        location: "Soho, Manhattan, New York",
        result: {
          stat: "3×",
          caption: "more customers than before",
          story:
            "We built Century Beauty Group's brand loyalty from scratch with interactive educational video, not ads — and the customers followed.",
        },
        logo: null,
        video:
          "https://drive.google.com/file/d/1cNPOJsdsc7fLZMVZAOUq47QxUJuvxMvM/preview",
      },
    ],
  },

  closing: {
    heading: "The conversation already started in person.",
  },
};
