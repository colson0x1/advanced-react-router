// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';

/* We can use the hook here.
 * We import useLoaderData and call in this component even though it's not a
 * page component. But there technically is no difference between the page
 * components and other components so therefore we can use it here as well.
 * We just need to make sure that we're no longer waiting for events on
 * the props here which we try to destructure.
 * We will see everything works and we're fetching and rendering those
 * events successfully. i.e http://localhost:3000
 * So that works.
 * Now one place where we can't get those events is in higher level route.
 * So for example, if we would go to the RootLayout there which is part of our
 * root route i.e on '/' in App.js
 * So if we go to the RooLayout i.e on pages/Root.jsx, and we use loaderData there,
 * we will see if we try to get my events there and if we console.log
 * our events, it will not work as expected.
 * Instead, it logs undefined.
 * The reason for that is we're trying to get data from a route that's actually
 * defined on a lower level.
 * We're trying to get data that's loaded from this route i.e events path
 * first array index in App.jsx, which is on a much higher level.
 * After all that is all deeply nested route and that's not possible.
 * Instead we can get access loaded data with the help of useLoaderData
 * in any component on the same levle or lower level than the component where
 * we added the loader, so the route on which we added the loader.
 * i.e We can use useLoaderData() in the element that's assigned to a route AND
 * in all components that might be used inside that element.
 */
function EventsList({ events }) {
  // const events = useLoaderData();

  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            {/* // relative path. relative to the currenly active route */}
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
