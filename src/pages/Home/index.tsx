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
import { handlePrefetchUsersRepos, useInfiniteUsersRepos, useUsers } from 'hooks/queries/useUser';
import { config } from 'config';
import { SearchParams } from 'utils/constants';
import ErrorAlert from 'components/Alerts/ErrorAlert';
import DynamicMessage from 'components/Messages/DynamicMessage/DynamicMessage';
import styles from 'components/Accordions/Accordion.module.scss';
import Star from 'assets/icons/star.svg';
import LoadingIndicator from 'components/Loaders/LoadingIndicator';

const schema = yup.object({
  username: yup.string().required('Username is a required field'),
});

type Inputs = InferType<typeof schema>;
type Props = {};

const Home: FC<Props> = () => {
  const [openId, setOpenId] = useState<string>('');
  const [activeUsername, setActiveUsername] = useState('');
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

  const queryUsers = useUsers({ username });
  const queryUsersRepos = useInfiniteUsersRepos({
    username: activeUsername,
    perPage: config.USERS_REPOS_PER_PAGE,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`?${SearchParams.SEARCH}=${data.username}`);
    closeAccordion();
  };

  // refetch users whenever username changes
  useEffect(() => {
    if (username) queryUsers.refetch();
  }, [username, queryUsers.refetch]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const closeAccordion = () => setOpenId(''); // close any open accordion
  const handleClickAccordionHeader = (username: string) => {
    setActiveUsername(username);
  };

  // refetch users repos whenever activeUsername changes
  useEffect(() => {
    if (activeUsername) {
      queryUsersRepos.refetch();
      queryUsersRepos.fetchNextPage();
    }
  }, [activeUsername, queryUsersRepos.refetch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const loadMore =
      scrollHeight - scrollTop === clientHeight &&
      queryUsersRepos.hasNextPage &&
      !queryUsersRepos.isFetchingNextPage;
    if (loadMore) {
      queryUsersRepos.fetchNextPage();
    }
  };

  const noUsersFound = queryUsers.isSuccess && queryUsers.data?.items?.length === 0;
  const noUsersReposFound =
    queryUsersRepos.isSuccess && !queryUsersRepos.data?.pages?.flatMap((page) => page.data).length;

  return (
    <Card>
      <ErrorAlert errors={[queryUsers.error, queryUsersRepos.error]} />
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputController name={'username'} placeholder={'Enter username'} type={'search'} />
          <Button className={'mt-3'} type={'submit'} isLoading={queryUsers.isLoading}>
            Search
          </Button>
        </Form>
      </FormProvider>

      <DynamicMessage
        isVisible={!!username && !noUsersFound}
      >{`Showing users for "${username}"`}</DynamicMessage>

      <Accordion open={openId} toggle={toggleAccordion} className={styles.accordionContainer}>
        <DynamicMessage isVisible={noUsersFound}>
          No users found. Try a different search query
        </DynamicMessage>
        {queryUsers?.data?.items?.map((user) => (
          <AccordionItem key={user.id}>
            <AccordionHeader
              targetId={user.id.toString()}
              onClick={() => handleClickAccordionHeader(user.login)}
              onMouseEnter={() => handlePrefetchUsersRepos(user.login)}
            >
              {user.login}
            </AccordionHeader>

            <AccordionBody accordionId={user.id.toString()}>
              <div
                style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}
                className={styles.accordionBodyWrapper}
                onScroll={handleScroll}
              >
                <DynamicMessage isVisible={noUsersReposFound}>
                  No repositories found for this user
                </DynamicMessage>
                <LoadingIndicator className={'mb-3'} isLoading={queryUsersRepos.isLoading} />
                <ul className={styles.accordionItemWrapper}>
                  {queryUsersRepos.data?.pages?.flatMap((page) =>
                    page.data.map((repo) => (
                      <li key={repo.id} className={styles.accordionItem}>
                        <div>
                          <p className={styles.name}>{repo.name}</p>
                          {repo.description && (
                            <p className={styles.description}>{repo.description}</p>
                          )}
                        </div>
                        <div className={styles.starWrapper}>
                          <p className={styles.startCount}>{repo.stargazers_count}</p>
                          <img src={Star} alt="star" width={18} height={18} />
                        </div>
                      </li>
                    )),
                  )}
                </ul>
                <LoadingIndicator
                  className={'mt-3'}
                  isLoading={queryUsersRepos.isFetchingNextPage}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default Home;
