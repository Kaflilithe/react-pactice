import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ParentComponent } from "../../types/core/base.type";

type Props = {
  bordered?: boolean;
  lifted?: boolean;
  open?: boolean;
  position?: "top" | "bottom" | "middle";
  close: () => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Modal = (props: ParentComponent<Props>) => {
  const { className, children, open, close, position, ...others } = props;
  const classes = classNames("modal", {
    [className || ""]: className,
    "modal-top": position === "top",
    "modal-bottom": position === "bottom",
    "modal-middle": position === "middle",
    "modal-open": open,
  });

  if (!open) {
    return null;
  }

  return (
    <div className={classes} {...others}>
      <button
        onClick={() => close()}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </button>
      {children}
    </div>
  );
};
