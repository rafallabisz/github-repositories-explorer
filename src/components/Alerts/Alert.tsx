import { FC } from 'react';
import { toast as t, ToastContainer as ToastCont, TypeOptions } from 'react-toastify';

export const ToastContainer: FC = () => {
  return (
    <ToastCont
      autoClose={4000}
      draggable={false}
      hideProgressBar={true}
      closeOnClick={false}
    />
  );
};

type ToastProps = {
  message: string;
  type?: TypeOptions;
  toastId?: string;
}

export const toast = ({ message, type = 'error', toastId }: ToastProps) => {
  return t(message, {
    type,
    theme: 'colored',
    toastId,
  });
};
