// we use useRouteLoaderData instead of useLoaderData whenever we use want to
// get access of the loader in the parent route which has ID specified
import { json, useParams, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  // useParams hook when called in a component function gives us access to the
  // currently active route parameters. So to the values that are encoded in
  // the URL for our dynamic path segments.
  // So for the values used there i.e :eventId on App
  // const params = useParams();

  // this hooks almost works like a useLoaderData but it takes a route ID as
  // an argument
  const data = useRouteLoaderData('event-detail');
  // now we can visit the single events and view the details
  return <EventItem event={data.event} />;
}

export default EventDetailPage;

// Hooks can't be useed inside loader function
// how to get event id?
// we still can get access to the route parameters that we need
// React router which calls this loader function for us actually passes an object
// to this loader function when executing it for us.
// And that object contains two important pieces of data:
// request property which contains a rquest object, and a params property which
// contains an object with all our route parameters.
export async function loader({ request, params }) {
  const id = params.eventId;

  // react router  will automatically wait for the promise and give us access
  // to te data to which it resolves.
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      },
    );
  } else {
    return response;
  }
}
