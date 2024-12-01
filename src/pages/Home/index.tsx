import { FC, useEffect, useState } from 'react';
import Card from 'components/Cards/Card';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Form } from 'reactstrap';
import InputController from 'components/Forms/Input';
import Button from 'components/Buttons/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUsers } from 'hooks/queries/useUser';

const schema = yup.object({
  username: yup.string().required('Username is a required field'),
});

type Inputs = InferType<typeof schema>;
type Props = {};

const Home: FC<Props> = () => {
  const [openId, setOpenId] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get('search') || '';

  const defaultValues: Inputs = {
    username,
  };

  const methods = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const queryUsers = useUsers(username);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`?search=${data.username}`);
  };

  // refetch users whenever username changes
  useEffect(() => {
    if (username) queryUsers.refetch();
  }, [username, queryUsers.refetch]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputController name={'username'} placeholder={'Enter username'} type={'search'} />
          <Button className={'mt-3'} type={'submit'} isLoading={queryUsers.isLoading}>
            Search
          </Button>
        </Form>
      </FormProvider>

      <p>{`Showing users for "${username}"`}</p>

      <Accordion open={openId} toggle={toggleAccordion}>
        {queryUsers?.data?.items?.map((user) => (
          <AccordionItem key={user.id}>
            <AccordionHeader targetId={user.id.toString()}>{user.login}</AccordionHeader>
            <AccordionBody accordionId={user.id.toString()}>
              <ul>{user.login}</ul>
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default Home;
