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
    instagram: string;
  };
  /**
   * Long Island business address is on the contract. Per the brief it stays off
   * the site unless Isti says otherwise -- set this string to render it in the
   * footer, one line, no other change needed.
   */
  address: string | null;
  hero: {
    lines: [string, string];
    resolve: [string, string];
    /** basenames in /public/video -- each exists as .webm, .mp4 and .jpg poster */
    clips: string[];
    /** [DEMO: hero-video] -- placeholder NYC footage; final is licensed stock */
    footageNote: string;
  };
  positioning: {
    title: string;
    paragraphs: Paragraph[];
  };
  /** Full-screen pinned beat between the argument and the services. */
  howWeDoIt: {
    heading: string;
  };
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
  /** Same carousel, reused under Service 02 for content made with influencers. */
  influencerReels: {
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
    title: string;
    body: Paragraph[];
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
    title: string;
    body: Paragraph[];
    /** [DEMO: client-logos] */
    logoNote: string;
    items: Client[];
  };
  closing: {
    heading: string;
    body: string;
  };
  /** /influencers -- dedicated application page linked from the header's "Join as Influencer". */
  influencerApply: {
    eyebrow: string;
    title: string;
    body: string;
    submitLabel: string;
    successHeading: string;
    successBody: string;
  };
  /** Lead form under the Closing/Contact section. */
  contactForm: {
    submitLabel: string;
    successHeading: string;
    successBody: string;
  };
}

const EMDASH = "—";

export const site: SiteContent = {
  meta: {
    name: "SocialYork",
    domain: "socialyork.com",
    title: `SocialYork ${EMDASH} We tell your brand's story`,
    description:
      "Content and an influencer network for New York businesses, run on tracking codes you can count. We commit to a referred-client number in writing.",
  },
  contact: {
    email: "hello@socialyork.com",
    phone: "480 743 2551",
    phoneHref: "+14807432551",
    instagram: "https://www.instagram.com/social_york/",
  },
  address: null,

  hero: {
    lines: ["New York City is noisy.", "Your brand has a story worth hearing."],
    resolve: ["SocialYork.", "We tell your brand's story."],
    clips: ["hero-01", "hero-02", "hero-03"],
    footageNote: "[DEMO: hero-video]",
  },

  positioning: {
    title: "We bring you sales. Guaranteed.",
    paragraphs: [
      "Your customers are already on social media. You're missing out on them.",
      "We build content that earns trust and gets you chosen, and back the sales with a guarantee, in writing.",
    ],
  },

  howWeDoIt: {
    heading: "How do we do it?",
  },

  services: [
    {
      index: "01",
      label: "Content Marketing",
      title: "Planning, Publishing, Promoting - Fully Managed",
      body: [
        "With 9 years of experience building six brands, we create interactive content around real customer problems: content people save and share instead of scrolling past. Our content strategy, paid advertising, and sales funnel, run by people and AI, deliver results.",
      ],
    },
    {
      index: "02",
      label: "Influencer Marketing",
      title: "Influencers who already have your audience.",
      body: [
        `We work with over 200 influencers. We connect the right ones with your brand, and they share their real experience with their audience ${EMDASH} building trust and referrals for your business.`,
      ],
    },
  ],

  reels: {
    label: "Recent work",
    note: "",
    items: [
      { url: "https://www.instagram.com/reel/DdmqElaRPrB/", cover: "/reels/reel-01.jpg" },
      { url: "https://www.instagram.com/reel/DdkLM74RbaT/", cover: "/reels/reel-02.jpg" },
      { url: "https://www.instagram.com/reel/DdkEDhfRLP7/", cover: "/reels/reel-03.jpg" },
      { url: "https://www.instagram.com/reel/Ddb2oH1xTDi/", cover: "/reels/reel-04.jpg" },
      { url: "https://www.instagram.com/reel/DdHvQIQM-8M/", cover: "/reels/reel-05.jpg" },
      { url: "https://www.instagram.com/reel/DcysggOxEXA/", cover: "/reels/reel-06.jpg" },
      { url: "https://www.instagram.com/reel/DcbjJxPiVjT/", cover: "/reels/reel-07.jpg" },
      { url: "https://www.instagram.com/reel/DcmWg2gt4Rg/", cover: "/reels/reel-08.jpg" },
      { url: "https://www.instagram.com/reel/DcOrIscEZfr/", cover: "/reels/reel-09.jpg" },
      { url: "https://www.instagram.com/reel/DbwRn7FTfW1/", cover: "/reels/reel-10.jpg" },
    ],
  },

  influencerReels: {
    label: "Influencer content",
    note: "",
    items: [
      { url: "https://www.instagram.com/p/DdZxww_Eajx/", cover: "/reels/influencer-01.jpg" },
      { url: "https://www.instagram.com/p/DdhajX3swVt/", cover: "/reels/influencer-02.jpg" },
      { url: "https://www.instagram.com/p/DbwRn7FTfW1/", cover: "/reels/reel-10.jpg" },
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
    label: "360 Growth Solution",
    title: "Everything else your business needs to grow.",
    body: [
      `A website that converts, a Google listing that gets you found, AI that replies and follows up while you're busy, and ads that reach the right people ${EMDASH} we handle every other piece so your growth doesn't stall.`,
    ],
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
    label: "Reporting",
    title: "Every result, tracked and reported.",
    body: [
      `We measure every metric that matters ${EMDASH} views, engagement, leads, and actual conversion ${EMDASH} not just the numbers that look good.`,
      "When the funnel underperforms, we fix it, and train your team to convert more of what comes in. You see the real ROI, not a vanity report.",
    ],
  },

  clients: {
    label: "Top Clients",
    title: "Success stories, backed by numbers.",
    body: [
      "More customers, more revenue, more repeat business — growth you can see and measure.",
    ],
    logoNote: "",
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
    heading: "Let's talk.",
    body: "Book a free consultation with our founders.",
  },

  influencerApply: {
    eyebrow: "Join as Influencer",
    title: "Turn your following into paid partnerships.",
    body: `We connect creators with New York brands looking for real partnerships ${EMDASH} no cold pitching, no guesswork. Tell us about your audience and we'll reach out when there's a fit.`,
    submitLabel: "Submit application",
    successHeading: "Got it.",
    successBody: "We'll review your application and reach out if there's a fit.",
  },

  contactForm: {
    submitLabel: "Submit",
    successHeading: "Got it.",
    successBody: "We'll be in touch shortly.",
  },
};
