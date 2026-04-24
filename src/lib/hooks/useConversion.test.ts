import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useConversion from './useConversion';
import { UTC, NOW } from '../constants';

describe('useConversion', () => {
  it('returns initial data with NOW and UTC defaults', () => {
    const { result } = renderHook(() => useConversion());
    expect(result.current.data.time).toBe(NOW);
    expect(result.current.data.timezone).toBe(UTC);
  });

  it('exposes a setConversion function', () => {
    const { result } = renderHook(() => useConversion());
    expect(typeof result.current.setConversion).toBe('function');
  });

  it('updates data when setConversion is called', async () => {
    const { result } = renderHook(() => useConversion());

    act(() => {
      result.current.setConversion({ time: '1700000000', timezone: UTC });
    });

    expect(result.current.data.time).toBe('1700000000');
  });

  it('sets an error for an invalid time string', () => {
    const { result } = renderHook(() => useConversion());

    act(() => {
      result.current.setConversion({ time: 'not-a-date', timezone: UTC });
    });

    expect(result.current.data.error).toBeTruthy();
  });

  it('reads ?time= and ?timezone= query params as initial values', () => {
    window.history.replaceState({}, '', '/?time=1700000000&timezone=America%2FNew_York');

    const { result } = renderHook(() => useConversion());

    expect(result.current.data.time).toBe('1700000000');
    expect(result.current.data.timezone).toBe('America/New_York');

    window.history.replaceState({}, '', '/');
  });
});
