import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";
import { ParentComponent } from "../../types/core/base.type";
import classNames from "classnames";
import { DaisyColor } from "../../types/core/color.type";
import { DaisySize } from "../../types/core/size.type";

type Props = {
  color?: DaisyColor;
  size?: DaisySize;
  loading?: boolean;
  outline?: boolean;
  wide?: boolean;
  glass?: boolean;
  link?: boolean;
  ghost?: boolean;
  active?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = (props: ParentComponent<Props>) => {
  const {
    className = '',
    color,
    size,
    loading,
    wide,
    glass,
    disabled,
    outline,
    link,
    ghost,
    active,
    ...others
  } = props;

  const classes = classNames("btn", {
    [className]: !!className,
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
    "btn-wide": wide,
    "btn-outline": outline,
    "btn-active": active,
    "btn-disabled": disabled,
    "btn-link": link,
    "btn-ghost": ghost,
    loading: loading,
    glass: glass,
  });

  return <button className={classes} {...others} />;
};
