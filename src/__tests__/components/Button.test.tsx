import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('should render children', () => {
    render(<Button data-testid="button">Click me</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toHaveTextContent('Click me');
  });

  it('should disable button when disabled prop is true', () => {
    render(
      <Button data-testid="button" type="submit" disabled>
        Submit
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Submit');
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Button data-testid="button" onClick={handleClick}>
        Click me
      </Button>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});