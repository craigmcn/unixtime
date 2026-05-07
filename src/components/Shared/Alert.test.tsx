import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something went wrong</Alert>);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders as an error alert by default", () => {
    const { container } = render(<Alert>Error message</Alert>);
    expect(container.querySelector(".alert--danger")).toBeInTheDocument();
  });

  it("renders as a warning alert when type is warning", () => {
    const { container } = render(<Alert type="warning">Watch out</Alert>);
    expect(container.querySelector(".alert--warning")).toBeInTheDocument();
    expect(container.querySelector(".alert--danger")).not.toBeInTheDocument();
  });

  it("includes the alert base class", () => {
    const { container } = render(<Alert>Test</Alert>);
    expect(container.querySelector(".alert")).toBeInTheDocument();
  });
});
