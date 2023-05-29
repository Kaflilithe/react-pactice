import classNames from "classnames";
import { ParentComponent } from "../../types/core/base.type";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { DaisySize } from "../../types/core/size.type";
import { TabTitle } from "./TabTitle";
import { Flex } from "./Flex";
import { JustifyItems } from "../../types/core/justify.type";

type Props = {
  size?: DaisySize;
  boxed?: boolean;
  orientation?: "column" | "row" | "column-revers" | "row-reverse";
  children: ReactElement[];
  justify?: JustifyItems;
  bordered?: boolean;
  lifted?: boolean;
  activeTab?: number;
  onTabChange?: (index: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Tabs = (props: ParentComponent<Props>) => {
  const {
    size = "md",
    boxed = false,
    bordered = false,
    lifted = false,
    orientation,
    children,
    className,
    justify,
    onTabChange,
    activeTab = 0,
    ...others
  } = props;

  const classes = classNames("tabs", {
    [className || ""]: !!className,
    "tabs-boxed": boxed,
  });

  const [selectedTab, setSelectedTab] = useState(activeTab);
  const query = new URLSearchParams();
  useEffect(() => {
    setSelectedTab(activeTab);
  }, [activeTab]);

  function onChange(index: number) {
    setSelectedTab(index);
    onTabChange?.(index);
  }

  return (
    <div className={classes} {...others}>
      <Flex
        orientation={
          orientation === "row" || orientation === "row-reverse"
            ? "column"
            : "row"
        }
      >
        <Flex orientation={orientation} justify={justify}>
          {children.map((item, index) => (
            <TabTitle
              key={index}
              size={item.props.size || size}
              bordered={item.props.bordered || bordered}
              lifted={item.props.lifted || lifted}
              title={item.props.title}
              index={index}
              setSelectedTab={onChange}
              active={index === selectedTab}
            />
          ))}
        </Flex>

        {children[selectedTab]}
      </Flex>
    </div>
  );
};
