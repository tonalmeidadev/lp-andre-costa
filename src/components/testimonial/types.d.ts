export type TestimonialItemProps = {
  rating: number;
  title: string;
  text: string;
  author: {
    name: string;
    locale: string;
  };
};

export type TestimonialCarouselProps = {
  items: readonly TestimonialItemProps[];
  className?: string;
};
