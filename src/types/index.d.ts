import type { AccordionItemProps } from "@/components/accordion/types";
import type { SwiperCardItem } from "@/components/swiper-card/types";
import type { TestimonialItemProps } from "@/components/testimonial/types";

export type BulletSection = {
  description?: string;
  bullets: {
    itemsPerColumn: number;
    variant: "check" | "x";
    items: readonly string[];
  };
};

export type BlockSection = {
  blocks: {
    itemsPerColumn: number;
    items: readonly string[];
  };
};

export type BulletSectionWithSub = {
  subdescription: string;
  bullets: {
    itemsPerColumn: number;
    variant: "check" | "x";
    items: readonly string[];
  };
};

export type PageType = {
  zero: {
    conditionText: string;
    conditionTextTimer: string;
    description: string;
    cta: string;
  };
  one: {
    headline: { html: string };
    description: string;
  };
  two: {
    vsl: {
      videoId: string;
    };
  };
  three: {
    ctaRed: string;
    subdescription: string;
    cta: string;
  };
  four: {
    headline: { html: string };
    description: string;
  };
  five: {
    marqueeText: string;
  };
  six: {
    title: string;
    description: string;
    bullets: {
      itemsPerColumn: number;
      variant: "check" | "x";
      items: readonly string[];
    };
    cta: string;
  };
  seven: {
    title: string;
    description: string;
    subtitle: string;
    subdescription: string;
    cards: {
      items: readonly SwiperCardItem[];
    };
  };
  eight: {
    title: string;
    bullets: BulletSection[];
    blocks: {
      title: string;
      items: BlockSection[];
    };
    subdescription: string;
    ctaCard: string;
    cta: string;
  };
  nine: {
    title: string;
    description: string;
    testimonials: {
      cards: {
        items: readonly TestimonialItemProps[];
      };
    };
  };
  ten: {
    title: string;
    description: string;
    sections: BulletSectionWithSub[];
    cta: string;
  };
  eleven: {
    biography: {
      name: string;
      backgroundUrl: string;
      photoUrl: string;
      bio: { html: string };
    };
  };
  twelve: {
    title: string;
    description: string;
    pathname: string;
    targetBlank: boolean;
    cta: string;
  };
  thirteen: {
    faq: {
      title: string;
      items: readonly AccordionItemProps[];
    };
    cta: string;
  };
};
