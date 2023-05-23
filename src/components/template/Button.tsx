import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ParentComponent } from "../../types/core/base.type";
import classNames from "classnames";
import { DaisyColor } from "../../types/core/color.type";
import { DaisySize } from "../../types/core/size.type";

type Props = {
  color?: DaisyColor;
  size?: DaisySize;
  } & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = (props: ParentComponent<Props>) =>{
    const { color, size, className, ...others } = props;

  const classes = classNames("btn", {
    [className || ""]: !!className,
    "btn-primary": color === "primary",
    "btn-secondary": color === "secondary",
    "btn-accent": color === "accent",
    "btn-info": color === "info",
    "btn-success": color === "success",
    "btn-warning": color === "warning",
    "btn-error": color === "error",
    "btn-lg": size === "lg",
    "btn-md": size === "md",
    "btn-sm": size === "sm",
    "btn-xs": size === "xs",
  });
    return <button className={classes} {...others} />;
}