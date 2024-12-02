import { FC } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import styles from 'pages/Home/components/UsersList.module.scss';
import DynamicMessage from 'components/Messages/DynamicMessage/DynamicMessage';
import { handlePrefetchUserRepos } from 'hooks/queries/useUser';
import { InfiniteData, UseInfiniteQueryResult, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse, User, UserRepository } from 'types/models';
import UserRepoItem from 'pages/Home/components/UserRepoItem';
import GenericInfiniteScroll from 'components/GenericInfiniteScroll';
import cn from 'classnames';
import ChevronDown from 'assets/icons/chevron-down.svg';

type Props = {
  openAccordionId: string;
  toggleAccordion: (id: string) => void;
  handleClickHeader: (username: string) => void;
  noUsersFound: boolean;
  queryUsers: UseQueryResult<ApiResponse<User>, Error>;
  queryUserRepos: UseInfiniteQueryResult<
    InfiniteData<
      {
        data: UserRepository[];
        page: number;
      },
      unknown
    >,
    Error
  >;
};

const UsersList: FC<Props> = ({
  queryUsers,
  queryUserRepos,
  toggleAccordion,
  openAccordionId,
  handleClickHeader,
  noUsersFound,
}) => {
  return (
    <Accordion
      open={openAccordionId}
      toggle={toggleAccordion}
      className={styles.accordionContainer}
    >
      <DynamicMessage isVisible={noUsersFound}>
        No users found. Try a different search query
      </DynamicMessage>

      {queryUsers?.data?.items?.map((user) => (
        <AccordionItem key={user.id}>
          <AccordionHeader
            targetId={user.id.toString()}
            onClick={() => handleClickHeader(user.login)}
            onMouseEnter={() => handlePrefetchUserRepos(user.login)}
            className={styles.accordionHeader}
          >
            <p className={styles.name}>{user.login}</p>
            <img
              className={cn(styles.chevronIcon, {
                [styles.rotated]: openAccordionId === user.id.toString(),
              })}
              src={ChevronDown}
              alt={'chevron'}
              width={16}
              height={16}
            />
          </AccordionHeader>

          <AccordionBody accordionId={user.id.toString()}>
            <GenericInfiniteScroll
              queryData={queryUserRepos}
              noItemsMessage={'No repositories found for this user'}
              renderItem={(repo) => <UserRepoItem repo={repo} />}
            />
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default UsersList;
