import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
/*
 * React Router that lets us find out whether we're currently in an
 * active transition if we're loading data, of if we have no active transition
 * going on.
 * It provides a hook that lets us do this called useNavigation
 */

// Outlet defines where the content of the child routes should be rendered.
function RootLayout() {
  // const events = useLoaderData();
  // If we try to get events here and console.log events, this will not work
  // as expected.
  // console.log(events);

  // We get a navigation object when we call useNavigation and that navigation
  // object has a couple of properties
  // But for us, the state property is the most important one.
  // This is simply a string which is either: idle, loading or submitting
  // depending on whether we don't have any active route transition
  // if we're having an active transition and we're loading data
  // or if we're submitting data.
  // With that we can add a loading text in return, in our main section for example,
  // which is only shown if navigation.state is equal to loading
  // With that added, if we go to Home and back to Events, we see that loading
  // text there (localhost:3000 to localhost:3000/events through nav links),
  // which signals to the user that we are loading data.
  // So which gives the user some feedback that something is happening.
  // And this happens every time we go to this All Events Page.
  // This is one way of finding out whether we are currently waiting for data
  // or not and how we could bring back such a loading indicator.
  // It's just important to recognize, that the loading indicator won't be added
  // on the page which you're transitioning to, but instead on some page or a
  // component, which is already visible on the screen when the transition is
  // started.
  // That's different compared to what we had before with useEffect and a
  // separate loading state.
  // i.e loading is shown in the / page when transitioning to /events page
  // which means its not shown in the /events page
  // separate loading state.
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
