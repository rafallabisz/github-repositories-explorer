import { FC } from 'react';
import styles from 'pages/Home/components/UserRepoItem.module.scss';
import Skeleton from 'components/Loaders/Skeleton';
import { config } from 'config';

type Props = {
  skeletonCount?: number;
};

const UserRepoItemSkeleton: FC = ({ skeletonCount = config.USER_REPOS_PER_PAGE }: Props) => {
  return (
    <>
      {Array(skeletonCount)
        .fill(null)
        .map((_, index) => (
          <li className={styles.container} key={index}>
            <div className={styles.wrapper}>
              <Skeleton width="70%" height="20px" className={styles.name} />
              <Skeleton width="90%" height="16px" className={styles.description} />
            </div>
            <div className={styles.starWrapper}>
              <Skeleton width="18px" height="22px" className={styles.starCount} />
              <Skeleton width="18px" height="18px" className={styles.starIcon} />
            </div>
          </li>
        ))}
    </>
  );
};

export default UserRepoItemSkeleton;
