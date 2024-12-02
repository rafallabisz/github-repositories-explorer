import { FC } from 'react';
import styles from 'pages/Home/components/UserRepoItem.module.scss';
import Star from 'assets/icons/star.svg';
import { UserRepository } from 'types/models';

type Props = {
  repo: UserRepository;
};

const UserRepoItem: FC<Props> = ({ repo }) => {
  return (
    <li key={repo.id} className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.name}>{repo.name}</p>
        {repo.description && <p className={styles.description}>{repo.description}</p>}
      </div>
      <div className={styles.starWrapper}>
        <p className={styles.starCount}>{repo.stargazers_count}</p>
        <img src={Star} alt="star" width={18} height={18} />
      </div>
    </li>
  );
};

export default UserRepoItem;
