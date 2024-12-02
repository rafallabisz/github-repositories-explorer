import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import InputController from 'components/Forms/Input';
import Button from 'components/Buttons/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchParams } from 'utils/constants';

const schema = yup.object({
  username: yup.string().required('Username is a required field'),
});

type Inputs = InferType<typeof schema>;

type Props = {
  closeAccordion: () => void;
  isLoading: boolean;
};

const SearchForm: FC<Props> = ({ closeAccordion, isLoading }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get(SearchParams.SEARCH) || '';

  const defaultValues: Inputs = {
    username,
  };

  const methods = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`?${SearchParams.SEARCH}=${data.username}`);
    closeAccordion();
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputController name={'username'} placeholder={'Enter username'} type={'search'} />
        <Button className={'mt-3'} type={'submit'} isLoading={isLoading}>
          Search
        </Button>
      </Form>
    </FormProvider>
  );
};

export default SearchForm;
