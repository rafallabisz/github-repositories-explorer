import { FC } from 'react';
import { Spinner } from 'reactstrap';

type Props = {
  isLoading: boolean;
  size?: number;
  className?: string;
};

const LoadingIndicator: FC<Props> = ({ isLoading, size = 20, className = '' }) => {
  const spinnerStyle = { width: size, height: size };

  return (
    <>
      {isLoading && (
        <div className={`d-flex justify-content-center ${className}`}>
          <Spinner style={spinnerStyle} />
        </div>
      )}
    </>
  );
};

export default LoadingIndicator;
