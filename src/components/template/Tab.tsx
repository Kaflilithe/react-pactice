import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ParentComponent } from "../../types/core/base.type";
import { DaisySize } from "../../types/core/size.type";

type Props = {
  size?: DaisySize;
  bordered?: boolean;
  lifted?: boolean;
  title: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Tab = (props: ParentComponent<Props>) => {
  const {lifted, bordered, size, title, ...others} = props;

  return (
    <div  {...others}>
      {props.children}
    </div>
  );
};
