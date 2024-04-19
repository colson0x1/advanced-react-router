import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

// Outlet defines where the content of the child routes should be rendered.
function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
