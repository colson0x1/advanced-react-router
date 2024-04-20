import { Outlet, useLoaderData } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

// Outlet defines where the content of the child routes should be rendered.
function RootLayout() {
  const events = useLoaderData();
  // If we try to get events here and console.log events, this will not work
  // as expected.
  // console.log(events);

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
