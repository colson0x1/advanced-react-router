import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditEventPage from './pages/EditEvent';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';

// RouterProvider is needed to apply and activate our route definitions
// createBrowserRouter fn is required to create these route definitions

const router = createBrowserRouter([
  // adding a parent route route for other routes
  {
    path: '/',
    element: <RootLayout />,
    // now all the other routes should be children of the root route
    // converting all the paths in the children to relative paths so that they're
    // relative to the path defined in the parent route here below in the route
    // definitions
    // + turn first route for the HomePage into index route instead of defining
    // empty path
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        // now we have to adjust children routes path
        // so we have couple of relative paths here
        // And now the overall path is constructed from the conbination
        // of /events and whatever path we have down here.
        // And of course this fist route here can again be turned into a index
        // route for this events parent route.
        // Now all these events routes have this new event specific navigation here

        /* loader is a property that wants a function as a value.
         * And this function will be executed by React Router whenever we are
         * about to visit this route.
         * So just before this route gets rendered, just before this JSX code
         * gets rendered i.e index route here as of now,
         * this loader functoin will be triggered and executed by React Router.
         * And it's in this loader function where we can therefore load and
         * fetch our data.
         * So we can go back to event.js and grab the code where we fetch the
         * data and wehre we evaluate the response and cut that and instead
         * move it into this loader function.
         * Now we'll need to tweak the code a little bit to make the code work
         * though. For example, we should add the async keyword here so that
         * we can use the await keyword inside.
         * Alternativelt we could of course use the .then() method since
         * fetch returns a Promise but async await is a bit easier to read.
         *
         * We also don't need to set any state values here inside the loader,
         * so we can get rid of all of that.
         * Instead here, we'll deal with that incorrect response case later
         * and we focus on the scenario that we do have a valid response.
         * In that case, we got the response data in this loader function.
         * And of course, we wanna get that data to that events page component
         * because that's where we need the data.
         * Well, the great thing is, when we define such a loader function,
         * React Router will automatically take any value we return in that
         * function, for example, the response data and will make that data
         * available in that page that's being rendered here as well as
         * any other components where we need it.
         * So we return resData here. To be precise, we wanna return
         * resData.events  because our response data object is actually an
         * object that will have an evvents property which holds the actual
         * array of events.
         * That's simply how the backend API reutrns the response for this
         * request. So we must access .events here to get that array of
         * dummy events from the backend.
         * And with that, this data is made available to the events page and
         * any other components that need the data.
         */

        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: async () => {
              const response = await fetch('http://localhost:8080/events');

              if (!response.ok) {
                // ..
              } else {
                const resData = await response.json();
                return resData.events;
              }
            },
          },
          { path: ':eventId', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
