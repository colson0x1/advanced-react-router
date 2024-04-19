import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditEventPage from './pages/EditEvent';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
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
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:eventId', element: <EventDetailPage /> },
      { path: 'events/new', element: <NewEventPage /> },
      { path: 'events/:eventId/edit', element: <EditEventPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
