import { render, screen } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator Component', () => {
  it('displays the spinner when isLoading is true', () => {
    render(<LoadingIndicator isLoading={true} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('does not display the spinner when isLoading is false', () => {
    render(<LoadingIndicator isLoading={false} />);
    const spinner = screen.queryByRole('status');
    expect(spinner).not.toBeInTheDocument();
  });

  it('applies the correct size when the size prop is provided', () => {
    render(<LoadingIndicator isLoading={true} size={30} />);
    const spinner = screen.queryByRole('status');
    expect(spinner).toHaveStyle({ width: '30px', height: '30px' });
  });

  it('applies a custom class name', () => {
    const customClass = 'custom-class';
    render(<LoadingIndicator isLoading={true} className={customClass} />);
    const spinnerContainer = screen.queryByRole('status')?.parentElement;
    expect(spinnerContainer).toHaveClass(customClass);
  });
});
