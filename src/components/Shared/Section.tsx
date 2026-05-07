import type { ReactNode } from "react";
import classNames from "classnames";

interface ISectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className, ...props }: ISectionProps) => (
  <section
    className={classNames(
      "flex__item flex__item--12 flex__item--6-md",
      className,
    )}
    {...props}
  >
    {children}
  </section>
);

export default Section;
