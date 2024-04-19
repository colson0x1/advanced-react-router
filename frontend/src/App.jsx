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
        children: [
          { index: true, element: <EventsPage /> },
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
