import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';

type Props = {};

const NotFound: FC<Props> = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to={routes.home}>Back to Home</Link>
    </div>
  );
};

export default NotFound;