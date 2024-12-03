import { FC } from 'react';
import SkeletonComponent, { SkeletonProps } from 'react-loading-skeleton';

type Props = SkeletonProps & {
  count?: number;
  height?: number | string;
  width?: number | string;
  borderRadius?: string | number;
  className?: string;
};

const Skeleton: FC<Props> = ({
  count = 1,
  height = '1rem',
  width = '100%',
  borderRadius = '4px',
  className = '',
  ...props
}) => {
  return (
    <SkeletonComponent
      count={count}
      height={height}
      width={width}
      borderRadius={borderRadius}
      className={className}
      {...props}
    />
  );
};

export default Skeleton;
