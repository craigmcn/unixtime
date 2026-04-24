import type { ReactNode } from 'react';
import classNames from 'classnames';

interface ISectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className, ...props }: ISectionProps) => (
  <section className={ classNames('app-section', className) } { ...props }>
    {children}
  </section>
);

export default Section;
