import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  const BUTTON_TEXT = 'Click Me';

  it('renders children correctly', () => {
    render(<Button>{BUTTON_TEXT}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(BUTTON_TEXT);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>{BUTTON_TEXT}</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows a loading spinner when isLoading is true', () => {
    render(<Button isLoading={true}>{BUTTON_TEXT}</Button>);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{BUTTON_TEXT}</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        {BUTTON_TEXT}
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom classNames', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass}>{BUTTON_TEXT}</Button>);
    expect(screen.getByRole('button')).toHaveClass(customClass);
  });
});
