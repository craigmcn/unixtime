import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import App from "./App";

// The CSP (netlify.toml) has no 'unsafe-inline' in style-src, so Font Awesome's
// CSS is bundled from this import instead of injected as a <style> at runtime.
config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
