import styles from 'layouts/MainLayout/MainLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'components/Alerts/Alert';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <ToastContainer />
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
