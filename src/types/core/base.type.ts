import { ReactNode } from "react";

export type ParentComponent<T> = {
  children?: ReactNode;
} & T;
