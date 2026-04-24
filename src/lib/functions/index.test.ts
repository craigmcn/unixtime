import { describe, it, expect } from 'vitest';
import { getRequestUrl } from '.';
import dayjs from '../dayjs';
import { NOW } from '../constants';

// jsdom is configured with url: 'http://localhost/' in vitest.config.ts

const momentDate = dayjs.unix(1700000000);

describe('getRequestUrl', () => {
  it('returns a URL with time and timezone query params', () => {
    const url = getRequestUrl({
      time: '1700000000',
      timezone: 'UTC',
      momentDate,
    });
    expect(url).toContain('time=1700000000');
    expect(url).toContain('timezone=UTC');
  });

  it('uses the unix timestamp from momentDate as the time param', () => {
    const url = getRequestUrl({
      time: 'anything',
      timezone: 'UTC',
      momentDate,
    });
    expect(url).toContain(`time=${momentDate.unix()}`);
  });

  it(`uses "${NOW}" when time is the NOW constant`, () => {
    const url = getRequestUrl({ time: NOW, timezone: 'UTC', momentDate });
    expect(url).toContain(`time=${NOW}`);
    expect(url).not.toContain('time=1700000000');
  });

  it('includes the current origin and pathname', () => {
    const url = getRequestUrl({
      time: '1700000000',
      timezone: 'UTC',
      momentDate,
    });
    expect(url).toMatch(/^http:\/\/localhost\//);
  });

  it('omits timezone from params when empty', () => {
    const url = getRequestUrl({ time: '1700000000', timezone: '', momentDate });
    expect(url).toContain('timezone=');
  });
});
