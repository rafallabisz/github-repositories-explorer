import { FC } from 'react';
import Card from 'components/Cards/Card';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import InputController from 'components/Forms/Input';
import Button from 'components/Buttons/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required('Username is a required field'),
});

type Inputs = InferType<typeof schema>;
type Props = {};

const Home: FC<Props> = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('search') || '';

  const defaultValues: Inputs = {
    username,
  };

  const methods = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`?search=${data.username}`);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputController name={'username'} placeholder={'Enter username'} type={'search'} />
          <Button className={'mt-3'} type={'submit'} isLoading={false}>
            Search
          </Button>
        </Form>
      </FormProvider>

      <p>{`Showing users for "${username}"`}</p>
    </Card>
  );
};

export default Home;
