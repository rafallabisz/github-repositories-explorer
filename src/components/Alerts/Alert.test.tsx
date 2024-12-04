import { render } from '@testing-library/react';
import { ToastContainer, toast } from './Alert';
import { toast as t, ToastContainer as ToastCont } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
  ToastContainer: jest.fn(() => null),
}));

describe('ToastContainer Component', () => {
  it('renders ToastContainer without crashing', () => {
    render(<ToastContainer />);
    expect(ToastCont).toHaveBeenCalled();
  });
});

describe('toast function', () => {
  it('calls toast with correct parameters', () => {
    const message = 'Test message';
    const type = 'success';
    const toastId = 'toastId';

    toast({ message, type, toastId });
    expect(t).toHaveBeenCalledWith(message, {
      type,
      theme: 'colored',
      toastId,
    });
  });

  it('defaults to type "error" when type is not provided', () => {
    const message = 'Default type message';
    toast({ message });

    expect(t).toHaveBeenCalledWith(message, {
      type: 'error',
      theme: 'colored',
    });
  });
});
