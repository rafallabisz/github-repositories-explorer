import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import Card from 'components/Cards/Card';

type Props = {};

const NotFound: FC<Props> = () => {
  return (
    <Card>
      <h1>Page not found</h1>
      <Link to={routes.home}>Back to Home</Link>
    </Card>
  );
};

export default NotFound;
