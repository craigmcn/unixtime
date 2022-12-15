import React from 'react';
import classNames from 'classnames';

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  title?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Button = ({ children, className, type = 'button', href, title, ...props }: IButtonProps) => {
  return (
    <>
      {!href && (
        <button
          className={ classNames(
            'flex items-center justify-center border rounded py-2 px-4',
            className
          ) }
          type={ type }
          title={ title }
          { ...props }
        >
          {children}
        </button>
      )}
      {href && (
        <a
          className={ classNames(
            'flex items-center justify-center border rounded py-2 px-4',
            className
          ) }
          href={ href }
          title={ title }
          { ...props }
        >
          {children}
        </a>
      )}
    </>
  );
};

export default Button;
