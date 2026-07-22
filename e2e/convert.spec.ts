import { test, expect } from "@playwright/test";

test("converts an entered Unix timestamp to UTC and ISO 8601", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Date and time or timestamp").fill("1700000000");
  await page.getByRole("button", { name: "Convert" }).click();

  await expect(page.locator("#results-utc")).toContainText(
    "Tuesday, November 14 2023",
  );
  await expect(
    page.locator('#results dt:has-text("ISO 8601") + dd'),
  ).toHaveText("2023-11-14T22:13:20.000+00:00");
});

test("reads the initial timestamp from the ?time= query param", async ({
  page,
}) => {
  await page.goto("/?time=1700000000");

  await expect(
    page.locator('#results dt:has-text("ISO 8601") + dd'),
  ).toHaveText("2023-11-14T22:13:20.000+00:00");
});

test("shows an error for an unparseable input", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Date and time or timestamp").fill("not a real date");
  await page.getByRole("button", { name: "Convert" }).click();

  await expect(page.locator(".alert")).toContainText(
    "Invalid time provided. Switched to current time.",
  );
});
