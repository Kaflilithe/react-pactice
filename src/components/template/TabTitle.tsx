import classNames from "classnames";
import { ParentComponent } from "../../types/core/base.type";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DaisySize } from "../../types/core/size.type";

type Props = {
  size?: DaisySize;
  bordered?: boolean;
  lifted?: boolean;
  title: string;
  index: number;
  active: boolean;
  setSelectedTab: (index: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const TabTitle = (props: ParentComponent<Props>) => {
  const {
    size,
    title,
    bordered,
    active,
    tabIndex,
    setSelectedTab,
    index,
    lifted,
    className,
    ...others
  } = props;

  const classes = classNames("tab", {
    [className || ""]: className,
    "tab-lg": size === "lg",
    "tab-xs": size === "xs",
    "tab-md": size === "md",
    "tab-sm": size === "sm",
    "tab-bordered": bordered,
    "tab-lifted": lifted,
    "tab-active": active,
  });

  return (
    <button
      className={classes}
      onClick={() => setSelectedTab(index)}
      {...others}
    >
      {title}
    </button>
  );
};
