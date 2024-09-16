import { ReactNode } from "react";

export type TweetCardPropsT = { text: string };

export type AccordionProps = {
  heading: string;
  content: ReactNode;
  defaultOpen?: boolean;
};
