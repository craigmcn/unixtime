import type { ReactNode } from 'react';

interface IMainProps {
  children: ReactNode;
  title?: string;
}

const Main = ({ children, title }: IMainProps) => {
  return (
    <main className="app-main">
      {!!title && <h1>{title}</h1>}

      <div className="app-content">
        {children}
      </div>
    </main>
  );
};

export default Main;
