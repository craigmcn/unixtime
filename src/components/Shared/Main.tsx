import React from 'react';

interface IMainProps {
  children: React.ReactNode;
  title?: string;
}

const Main = ({ children, title }: IMainProps) => {
  return (
    <main className="mx-auto max-w-4xl min-w-max p-2 sm:p-4">
      {!!title && <h1 className="text-3xl my-3">{title}</h1>}

      <div className="sm:flex sm:gap-x-4">
        {children}
      </div>
    </main>
  );
};

export default Main;
