import { describe, it, expect } from "vitest";
import { convertTime } from "./convertTime";
import { UTC } from "../constants";

describe("convertTime", () => {
  describe("numeric inputs", () => {
    it("converts a unix timestamp in seconds", () => {
      const result = convertTime(1700000000);
      expect(result.momentDate.unix()).toBe(1700000000);
      expect(result.error).toBeUndefined();
      expect(result.title).toBe("Converted time");
    });

    it("converts a string unix timestamp in seconds", () => {
      const result = convertTime("1700000000");
      expect(result.momentDate.unix()).toBe(1700000000);
    });

    it("converts milliseconds (>= 1e10, < 1e13)", () => {
      const result = convertTime(1700000000000);
      expect(result.momentDate.unix()).toBe(1700000000);
    });

    it("converts microseconds (>= 1e13, < 1e16)", () => {
      const result = convertTime(1700000000000000);
      expect(result.momentDate.unix()).toBe(1700000000);
    });
  });

  describe("natural language inputs", () => {
    it('parses "now" as the current time', () => {
      const before = Math.floor(Date.now() / 1000);
      const result = convertTime("now");
      const after = Math.ceil(Date.now() / 1000);
      expect(result.momentDate.unix()).toBeGreaterThanOrEqual(before);
      expect(result.momentDate.unix()).toBeLessThanOrEqual(after);
      expect(result.error).toBeUndefined();
    });

    it('parses "now()" as the current time', () => {
      const before = Math.floor(Date.now() / 1000);
      const result = convertTime("now()");
      const after = Math.ceil(Date.now() / 1000);
      expect(result.momentDate.unix()).toBeGreaterThanOrEqual(before);
      expect(result.momentDate.unix()).toBeLessThanOrEqual(after);
    });

    it("parses a natural language date string", () => {
      const result = convertTime("January 1, 2024 00:00:00");
      expect(result.error).toBeUndefined();
      expect(result.momentDate.unix()).toBeGreaterThan(0);
    });

    it("returns an error for an unparseable string", () => {
      const result = convertTime("not a date xyz");
      expect(result.error).toBeTruthy();
    });
  });

  describe("empty / falsy input", () => {
    it("uses the current time and sets title to 'Current time'", () => {
      const before = Math.floor(Date.now() / 1000);
      const result = convertTime("");
      const after = Math.ceil(Date.now() / 1000);
      expect(result.momentDate.unix()).toBeGreaterThanOrEqual(before);
      expect(result.momentDate.unix()).toBeLessThanOrEqual(after);
      expect(result.title).toBe("Current time");
    });
  });

  describe("timezone handling", () => {
    it("defaults to UTC when no timezone is provided", () => {
      const result = convertTime(1700000000);
      expect(result.timezone).toBe(UTC);
      expect(result.warning).toBeUndefined();
    });

    it("accepts a valid IANA timezone", () => {
      const result = convertTime(1700000000, "America/New_York");
      expect(result.timezone).toBe("America/New_York");
      expect(result.warning).toBeUndefined();
    });

    it("warns and falls back to UTC for an invalid timezone", () => {
      const result = convertTime(1700000000, "Not/ATimezone");
      expect(result.warning).toBeTruthy();
      expect(result.timezone).toBe(UTC);
    });

    it("returns time and timezone on the result", () => {
      const result = convertTime(1700000000, "UTC");
      expect(result.time).toBe(1700000000);
      expect(result.timezone).toBe(UTC);
    });
  });

  describe("output shape", () => {
    it("returns a momentDate, time, timezone, and title", () => {
      const result = convertTime(1700000000);
      expect(result).toMatchObject({
        time: 1700000000,
        timezone: UTC,
        title: "Converted time",
      });
      expect(result.momentDate).toBeDefined();
    });

    it("returns a numeric timestamp as time when input is falsy", () => {
      // empty input → falls back to Date.now() in milliseconds (truthy number, not NOW)
      const result = convertTime("");
      expect(typeof result.time).toBe("number");
    });
  });
});
