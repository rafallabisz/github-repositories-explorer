import { FC, useEffect, useState } from 'react';
import Card from 'components/Cards/Card';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteUserRepos, useUsers } from 'hooks/queries/useUser';
import { config } from 'config';
import { SearchParams } from 'utils/constants';
import ErrorAlert from 'components/Alerts/ErrorAlert';
import DynamicMessage from 'components/Messages/DynamicMessage/DynamicMessage';
import SearchForm from 'pages/Home/components/SearchForm';
import UsersList from 'pages/Home/components/UsersList';

type Props = {};

const Home: FC<Props> = () => {
  const [openAccordionId, setOpenAccordionId] = useState<string>('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [searchParams] = useSearchParams();
  const username = searchParams.get(SearchParams.SEARCH) || '';

  const queryUsers = useUsers({ username });
  const queryUserRepos = useInfiniteUserRepos({
    username: selectedUsername,
    perPage: config.USER_REPOS_PER_PAGE,
  });

  // refetches users data when the username query parameter is updated
  useEffect(() => {
    if (username) queryUsers.refetch();
  }, [username]);

  // refetch user repos and fetch the next page whenever the selectedUsername changes
  useEffect(() => {
    if (selectedUsername) {
      queryUserRepos.refetch();
      queryUserRepos.fetchNextPage();
    }
  }, [selectedUsername]);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? '' : id));
  };

  const closeAccordion = () => setOpenAccordionId('');

  const handleClickAccordionHeader = (username: string) => {
    setSelectedUsername(username);
  };

  const noUsersFound = queryUsers.isSuccess && queryUsers.data?.items?.length === 0;

  return (
    <Card>
      <ErrorAlert errors={[queryUsers.error, queryUserRepos.error]} />
      <SearchForm closeAccordion={closeAccordion} isLoading={queryUsers.isLoading} />

      <DynamicMessage
        isVisible={!!username && !noUsersFound}
      >{`Showing users for "${username}"`}</DynamicMessage>

      <UsersList
        openAccordionId={openAccordionId}
        toggleAccordion={toggleAccordion}
        handleClickHeader={handleClickAccordionHeader}
        noUsersFound={noUsersFound}
        queryUsers={queryUsers}
        queryUserRepos={queryUserRepos}
      />
    </Card>
  );
};

export default Home;
