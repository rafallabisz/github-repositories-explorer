import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  const buttonText = 'Click Me';
  const renderButton = (props = {}) => render(<Button {...props}>{buttonText}</Button>);

  it('renders the button with the correct text', () => {
    renderButton();
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
  });

  it('is disabled when the disabled prop is true', () => {
    renderButton({ disabled: true });
    expect(screen.getByRole('button', { name: buttonText })).toBeDisabled();
  });

  it('shows a loading spinner when isLoading is true', () => {
    renderButton({ isLoading: true });
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderButton({ onClick: handleClick });
    fireEvent.click(screen.getByRole('button', { name: buttonText }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    renderButton({ onClick: handleClick, disabled: true });
    fireEvent.click(screen.getByRole('button', { name: buttonText }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom classNames', () => {
    const customClass = 'custom-class';
    renderButton({ className: customClass });
    expect(screen.getByRole('button', { name: buttonText })).toHaveClass(customClass);
  });
  
  it('renders children correctly', () => {
    renderButton();
    expect(screen.getByRole('button', { name: buttonText })).toHaveTextContent(buttonText);
  });
});
