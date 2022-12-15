import React from 'react';
import classNames from 'classnames';

interface ISectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className, ...props }: ISectionProps) => (
  <section className={ classNames('w-full sm:w-1/2', className) } { ...props }>
    {children}
  </section>
);

export default Section;
