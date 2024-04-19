import { Outlet } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      {/* We're rendering the Outlet component here because we wanna use this 
      EventsRootLayout component as a wrapper around other pages, where the 
      content of those pages should be rendered in this place where we have
      this Outlet component as a marker so to say */}
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
