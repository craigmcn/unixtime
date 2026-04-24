import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  it('renders the time input', () => {
    render(<Form setConversion={vi.fn()} />);
    expect(
      screen.getByPlaceholderText(/date and time or a timestamp/i),
    ).toBeInTheDocument();
  });

  it('renders the Convert button', () => {
    render(<Form setConversion={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /convert/i }),
    ).toBeInTheDocument();
  });

  it('renders the timezone select', () => {
    render(<Form setConversion={vi.fn()} />);
    // react-select renders the placeholder as a <div>, not an input placeholder attr
    expect(screen.getByText(/Enter a time zone/i)).toBeInTheDocument();
  });

  it('calls setConversion with the entered time value on submit', async () => {
    const setConversion = vi.fn();
    render(<Form setConversion={setConversion} />);

    const input = screen.getByPlaceholderText(/date and time or a timestamp/i);
    await userEvent.type(input, '1700000000');
    await userEvent.click(screen.getByRole('button', { name: /convert/i }));

    expect(setConversion).toHaveBeenCalledOnce();
    expect(setConversion).toHaveBeenCalledWith(
      expect.objectContaining({ time: '1700000000' }),
    );
  });

  it('clears the time input after submission', async () => {
    render(<Form setConversion={vi.fn()} />);

    const input = screen.getByPlaceholderText(/date and time or a timestamp/i);
    await userEvent.type(input, '1700000000');
    await userEvent.click(screen.getByRole('button', { name: /convert/i }));

    expect(input).toHaveValue('');
  });
});
