import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Result from './Result';
import dayjs from '../../lib/dayjs';
import { UTC } from '../../lib/constants';

// 1700000000 = 2023-11-14 22:13:20 UTC
const baseData = {
  dateTime: dayjs.unix(1700000000),
  time: '1700000000',
  timezone: UTC,
  title: 'Converted time',
};

describe('Result', () => {
  it('renders the result title', () => {
    render(<Result data={baseData} />);
    expect(screen.getByText('Converted time')).toBeInTheDocument();
  });

  it('renders the unix timestamp', () => {
    render(<Result data={baseData} />);
    expect(screen.getByText('1700000000')).toBeInTheDocument();
  });

  it('renders the UTC date', () => {
    const { container } = render(<Result data={baseData} />);
    expect(container.querySelector('#results-utc')).toHaveTextContent(
      '2023-11-14',
    );
  });

  it('renders ISO 8601 format', () => {
    render(<Result data={baseData} />);
    expect(screen.getByText(/2023-11-14T/)).toBeInTheDocument();
  });

  it('renders an error alert when error is set', () => {
    render(
      <Result
        data={{
          ...baseData,
          error: 'Invalid time provided. Switched to current time.',
        }}
      />,
    );
    expect(screen.getByText(/Invalid time provided/)).toBeInTheDocument();
  });

  it('renders a warning alert when warning is set', () => {
    render(
      <Result
        data={{
          ...baseData,
          warning: 'Invalid timezone provided. Switched to UTC.',
        }}
      />,
    );
    expect(screen.getByText(/Invalid timezone provided/)).toBeInTheDocument();
  });

  it('shows the timezone row when timezone is not UTC', () => {
    render(<Result data={{ ...baseData, timezone: 'America/New_York' }} />);
    expect(screen.getByText('America/New_York')).toBeInTheDocument();
  });

  it('does not show a timezone row for UTC', () => {
    const { container } = render(<Result data={baseData} />);
    // the per-timezone dd only renders for non-UTC timezones
    expect(
      container.querySelector('#results-timezone'),
    ).not.toBeInTheDocument();
  });

  it('renders the Repeat link', () => {
    render(<Result data={baseData} />);
    expect(screen.getByRole('link', { name: /repeat/i })).toBeInTheDocument();
  });
});
