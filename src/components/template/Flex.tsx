import classNames from "classnames";
import { AlignItems } from "../../types/core/align.type";
import { ParentComponent } from "../../types/core/base.type";
import { JustifyItems } from "../../types/core/justify.type";

type Props = {
  orientation?: "column" | "row" | "column-revers" | "row-reverse";
  justify?: JustifyItems;
  align?: AlignItems;
};

export const Flex = (props: ParentComponent<Props>) => {
  const classes = classNames("flex", {
    "flex-col": props.orientation === "column",
    "flex-row": props.orientation === "row",
    "flex-col-reverse": props.orientation === "column-revers",
    "flex-row-reverse": props.orientation === "row-reverse",
    "justify-start": props.justify === "start",
    "justify-end": props.justify === "end",
    "justify-center": props.justify === "center",
    "justify-stretch": props.justify === "stretch",
    "items-start": props.align === "start",
    "items-end": props.align === "end",
    "items-center": props.align === "center",
    "items-baseline": props.align === "baseline",
    "items-stretch": props.align === "stretch"

  });

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};
