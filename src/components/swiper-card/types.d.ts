export type SwiperCardItem = {
  imageUrl: string;
  description: string;
};

export type SwiperCardProps = {
  className?: string;
  items: readonly SwiperCardItem[];
};
