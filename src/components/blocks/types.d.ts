export type BlocksItemProps = {
  text: string;
};

export type BlocksProps = {
  itemsPerColumn: number;
  items: readonly (string | BlocksItemProps)[];
  className?: string;
};
