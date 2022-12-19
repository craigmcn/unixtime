import React from 'react';
import Logo from './Logo';
import { DOCUMENT_TITLE } from '../../lib/constants';

const Header = () => {
  return (
    <header className={ `sm:flex items-center py-2 px-4 font-medium text-xl
      bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-900` }>
      <a className="flex items-center" href="/">
        <Logo />
        craigmcn
      </a>

      <h1 className="ml-auto">{DOCUMENT_TITLE}</h1>
    </header>
  );
};

export default Header;
