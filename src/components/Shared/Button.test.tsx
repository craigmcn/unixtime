import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders as a <button> by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders as an <a> when href is provided", () => {
    render(<Button href="/somewhere">Go</Button>);
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/somewhere");
  });

  it("calls onClick when the button is clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the base button class plus any additional className", () => {
    render(<Button className="button--primary">Test</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("button");
    expect(btn).toHaveClass("button--primary");
  });

  it("sets the button type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("sets the title attribute", () => {
    render(<Button title="My title">Test</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("title", "My title");
  });
});
