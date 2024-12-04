import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import InputController from './Input';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('InputController Component', () => {
  it('renders the input field without errors', () => {
    render(
      <Wrapper>
        <InputController name="test" />
      </Wrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange callback when input value changes', () => {
    const handleChange = jest.fn();

    render(
      <Wrapper>
        <InputController name="test" onChange={handleChange} />
      </Wrapper>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
