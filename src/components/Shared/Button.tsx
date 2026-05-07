import type { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

interface IButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  title?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Button = ({
  children,
  className,
  type = "button",
  href,
  title,
  ...props
}: IButtonProps) => {
  return (
    <>
      {!href && (
        <button
          className={classNames("button", className)}
          type={type}
          title={title}
          {...props}
        >
          {children}
        </button>
      )}
      {href && (
        <a
          className={classNames("button", className)}
          href={href}
          title={title}
          {...props}
        >
          {children}
        </a>
      )}
    </>
  );
};

export default Button;
