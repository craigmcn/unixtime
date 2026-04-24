import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useCopyToClipboard from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null as initial copied value', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toBeNull();
  });

  it('copies text and returns true when clipboard is available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    let success: boolean;
    await act(async () => {
      success = await result.current[1]('hello');
    });

    expect(success!).toBe(true);
    expect(result.current[0]).toBe('hello');
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false and does not update state when clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    let success: boolean;
    await act(async () => {
      success = await result.current[1]('hello');
    });

    expect(success!).toBe(false);
    expect(result.current[0]).toBeNull();
  });

  it('returns false and resets state when clipboard.writeText throws', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    let success: boolean;
    await act(async () => {
      success = await result.current[1]('hello');
    });

    expect(success!).toBe(false);
    expect(result.current[0]).toBeNull();
  });
});
