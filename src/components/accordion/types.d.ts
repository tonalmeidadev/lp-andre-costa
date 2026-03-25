export type AccordionItemProps = {
  question: string;
  answer: string;
};

export type AccordionProps = {
  items: readonly AccordionItemProps[];
  className?: string;
};
