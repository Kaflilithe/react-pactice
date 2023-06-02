import classNames from "classnames";
import { AlignItems } from "../../types/core/align.type";
import { ParentComponent } from "../../types/core/base.type";
import { JustifyItems } from "../../types/core/justify.type";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = {
  orientation?: "column" | "row" | "column-revers" | "row-reverse";
  justify?: JustifyItems;
  align?: AlignItems;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Flex = (props: ParentComponent<Props>) => {
  const { orientation, justify, align, className, ...others } = props;

  const classes = classNames("flex", {
    [className || ""]: !!className,
    "flex-col": orientation === "column",
    "flex-row": orientation === "row",
    "flex-col-reverse": orientation === "column-revers",
    "flex-row-reverse": orientation === "row-reverse",
    "justify-start": justify === "start",
    "justify-end": justify === "end",
    "justify-center": justify === "center",
    "justify-stretch": justify === "stretch",
    "justify-between": justify === "between",
    "items-start": align === "start",
    "items-end": align === "end",
    "items-center": align === "center",
    "items-baseline": align === "baseline",
    "items-stretch": align === "stretch",
  });

  return <div className={classes} {...others} />;
};
