import { render, screen } from '@testing-library/react';
import { AxiosError } from 'axios';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert Component', () => {
  it('renders error message when errors array is passed', () => {
    const errors = [new Error('Generic error')];
    render(<ErrorAlert errors={errors} />);
    expect(screen.getByText('Generic error')).toBeInTheDocument();
  });

  it('does not render error message when errors array contains null or undefined', () => {
    const errors = [null, undefined];
    render(<ErrorAlert errors={errors} />);
    const alert = screen.queryByRole('alert');
    expect(alert).not.toBeInTheDocument();
  });

  it('renders default error message when errors array contains error string', () => {
    const defaultError = 'Something went wrong. Please try again.';
    const errors = [defaultError];
    render(<ErrorAlert errors={errors} />);
    const alert = screen.queryByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(defaultError);
  });

  it('renders default server error message if AxiosError has no message', () => {
    const axiosError = new AxiosError('Request failed', '500', undefined, undefined);
    render(<ErrorAlert errors={[axiosError]} />);
    const alert = screen.queryByRole('alert');
    expect(alert).toHaveTextContent('A server error occurred.');
  });
});
