import Logo from './Logo';
import { DOCUMENT_TITLE } from '../../lib/constants';

const Header = () => {
  return (
    <header className="app-header">
      <a href="/">
        <Logo />
        craigmcn
      </a>

      <h1>{DOCUMENT_TITLE}</h1>
    </header>
  );
};

export default Header;
