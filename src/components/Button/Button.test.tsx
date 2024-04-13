import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  test('renders Button', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toBeInTheDocument();
  });

  test('renders Button with onClick', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Test</Button>);
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(onClick).toHaveBeenCalled());
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders Button with disabled', () => {
    render(<Button disabled>Test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders Button with type', () => {
    render(<Button type="submit">Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test.each([
    ['primary', 'bg-blue-700'],
    ['secondary', 'bg-white'],
  ] as const)('renders Button with color %s', (color, expected) => {
    render(<Button color={color}>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass(expected);
  });

  test.each([
    ['solid', 'text-white'],
    ['outlined', 'text-blue-700'],
  ] as const)('renders Button with variant %s', (variant, expected) => {
    render(<Button variant={variant}>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass(expected);
  });

  test('renders Button with full', () => {
    render(<Button full>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  test('renders Button snapshot', () => {
    const { container } = render(<Button>Snapshot</Button>);
    expect(container).toMatchSnapshot();
  });
});
