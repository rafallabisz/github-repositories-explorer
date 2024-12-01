import styles from 'layouts/MainLayout/MainLayout.module.scss';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

