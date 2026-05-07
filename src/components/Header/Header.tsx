import Logo from "./Logo";
import { DOCUMENT_TITLE } from "../../lib/constants";

const Header = () => {
  return (
    <header className="header">
      <div className="brand">
        <a href="/">
          <Logo />
          craigmcn
        </a>
      </div>

      <h1>{DOCUMENT_TITLE}</h1>
    </header>
  );
};

export default Header;
