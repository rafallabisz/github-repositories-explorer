import { FC } from 'react';
import styles from 'components/Messages/DynamicMessage/DynamicMessage.module.scss';

type Props = {
  children: string;
  isVisible: boolean
};

const DynamicMessage: FC<Props> = ({ children, isVisible }) => {
  return (
    <>
      {isVisible && <p className={styles.content}>{children}</p>}
    </>
  );
};

export default DynamicMessage;