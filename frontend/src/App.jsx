import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditEventPage from './pages/EditEvent';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';

// RouterProvider is needed to apply and activate our route definitions
// createBrowserRouter fn is required to create these route definitions

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/events/:eventId', element: <EventDetailPage /> },
  { path: '/events/new', element: <NewEventPage /> },
  { path: '/events/:eventId/edit', element: <EditEventPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
