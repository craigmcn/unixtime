import { describe, it, expect } from "vitest";
import { getRequestUrl } from ".";
import dayjs from "../dayjs";
import { NOW } from "../constants";

// jsdom is configured with url: 'http://localhost/' in vitest.config.ts

const dateTime = dayjs.unix(1700000000);

describe("getRequestUrl", () => {
  it("returns a URL with time and timezone query params", () => {
    const url = getRequestUrl({
      time: "1700000000",
      timezone: "UTC",
      dateTime,
    });
    expect(url).toContain("time=1700000000");
    expect(url).toContain("timezone=UTC");
  });

  it("uses the unix timestamp from dateTime as the time param", () => {
    const url = getRequestUrl({
      time: "anything",
      timezone: "UTC",
      dateTime,
    });
    expect(url).toContain(`time=${dateTime.unix()}`);
  });

  it(`uses "${NOW}" when time is the NOW constant`, () => {
    const url = getRequestUrl({ time: NOW, timezone: "UTC", dateTime });
    expect(url).toContain(`time=${NOW}`);
    expect(url).not.toContain("time=1700000000");
  });

  it("includes the current origin and pathname", () => {
    const url = getRequestUrl({
      time: "1700000000",
      timezone: "UTC",
      dateTime,
    });
    expect(url).toMatch(/^http:\/\/localhost\//);
  });

  it("omits timezone from params when empty", () => {
    const url = getRequestUrl({ time: "1700000000", timezone: "", dateTime });
    expect(url).toContain("timezone=");
  });
});
