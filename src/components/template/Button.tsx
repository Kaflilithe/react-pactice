import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ParentComponent } from "../../types/core/base.type";
import classNames from "classnames";
import { DaisyColor } from "../../types/core/color.type";
import { DaisySize } from "../../types/core/size.type";

type Props = {
  background?: DaisyColor;
  size?: DaisySize;
  } & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = (props: ParentComponent<Props>) =>{
    const { background, size, className, ...others } = props;

  const classes = classNames("btn", {
    [className || ""]: !!className,
    "btn-primary": background === "primary",
    "btn-secondary": background === "secondary",
    "btn-accent": background === "accent",
    "btn-info": background === "info",
    "btn-success": background === "success",
    "btn-warning": background === "warning",
    "btn-error": background === "error",
    "btn-lg": size === "lg",
    "btn-md": size === "md",
    "btn-sm": size === "sm",
    "btn-xs": size === "xs",
  });
    return <button className={classes} {...others} />;
}