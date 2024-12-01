import { FC, ReactNode } from 'react';
import { CardBody, Card as CardRS } from 'reactstrap';
import styles from './Card.module.scss';

type Props = {
  children: ReactNode;
};

const Card: FC<Props> = ({ children }) => {
  return (
    <CardRS className={styles.container}>
      <CardBody>
        {children}
      </CardBody>
    </CardRS>
  );
};

export default Card;