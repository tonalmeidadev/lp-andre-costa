export type BulletPointsItemProps = {
  text: string;
};

export type BulletPointsProps = {
  itemsPerColumn: number;
  variant: "check" | "x";
  items: readonly (string | BulletPointsItemProps)[];
  className?: string;
};
