import { ChangeEvent, FC } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import styles from './Input.module.scss';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

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
        return (
          <>
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              className={styles.container}
              invalid={!!fieldState.error}
            />
            {fieldState.error && <FormFeedback>{fieldState.error.message}</FormFeedback>}
          </>
        );
      }}
    />
  );
};

export default InputController;
