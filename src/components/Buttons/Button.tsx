import { FC } from 'react';
import { Button as ButtonRS, ButtonProps, Spinner } from 'reactstrap';
import styles from 'components/Buttons/Button.module.scss';
import cn from 'classnames';

export type Props = {
  children: string;
  isLoading?: boolean;
} & ButtonProps;

const Button: FC<Props> = ({
  children,
  className,
  onClick,
  disabled,
  isLoading = false,
  ...props
}: Props) => {
  const isDisabled = disabled || isLoading;

  return (
    <ButtonRS
      className={cn(`${styles.btn} ${className}`, {
        [styles.disabled]: isDisabled,
      })}
      {...props}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Spinner size={'sm'} as={'span'} role={'status'} />
      ) : (
        <span className={styles.content}>{children}</span>
      )}
    </ButtonRS>
  );
};

export default Button;
