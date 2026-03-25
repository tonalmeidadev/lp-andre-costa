export type SwiperCardItem = {
  title: string;
  description: string;
};

export type SwiperCardProps = {
  items: readonly SwiperCardItem[];
};
