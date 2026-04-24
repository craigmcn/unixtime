import type { ReactNode } from 'react';

interface IMainProps {
  children: ReactNode;
  title?: string;
}

const Main = ({ children, title }: IMainProps) => {
  return (
    <main className="main main--fixed">
      {!!title && <h2 className="mt-5 mb-4">{title}</h2>}

      <div className="flex flex--grid">{children}</div>
    </main>
  );
};

export default Main;
