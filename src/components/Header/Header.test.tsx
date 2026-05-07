import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { DOCUMENT_TITLE } from "../../lib/constants";

describe("Header", () => {
  it("renders the document title", () => {
    render(<Header />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      DOCUMENT_TITLE,
    );
  });

  it("renders a link to the home page", () => {
    render(<Header />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the logo SVG", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    render(<Header />);
    expect(screen.getByText(/craigmcn/i)).toBeInTheDocument();
  });
});
