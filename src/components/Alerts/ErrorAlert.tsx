import { FC } from 'react';
import { Alert } from 'reactstrap';
import { AxiosError } from 'axios';

type Props = {
  errors: unknown[];
};

const ErrorAlert: FC<Props> = ({ errors }) => {
  const getErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || 'A server error occurred.';
    }
    if (error instanceof Error) {
      return error.message || 'An unexpected error occurred.';
    }
    return 'Something went wrong. Please try again.';
  };

  return (
    <>
      {errors?.map((error, index) =>
        error ? (
          <Alert color="danger" key={index}>
            {getErrorMessage(error)}
          </Alert>
        ) : null,
      )}
    </>
  );
};

export default ErrorAlert;
