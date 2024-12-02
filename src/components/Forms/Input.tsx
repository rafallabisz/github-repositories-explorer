import { ChangeEvent, FC } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import styles from './Input.module.scss';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import cn from 'classnames';

type Props = {
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & FieldValues;

/**
 * Custom Controller for React Hook Form
 * combined with Reactstrap inputs
 */
const InputController: FC<Props> = ({ onChange, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        return (
          <>
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              className={cn(styles.container, {
                [styles.error]: hasError,
              })}
              invalid={hasError}
            />
            {fieldState.error && <FormFeedback>{fieldState.error.message}</FormFeedback>}
          </>
        );
      }}
    />
  );
};

export default InputController;
