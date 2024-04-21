// we use useRouteLoaderData instead of useLoaderData whenever we use want to
// get access of the loader in the parent route which has ID specified
import {
  json,
  redirect,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
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

// here we add the code for deleting the event
// we get params object for action fn just as we do for loaders
export async function action({ params, request }) {
  const eventId = params.eventId;
  // configure this request which we're sending here
  // we can dynamically extract the method from the submitted form so to say
  // with that request object, which we also get here in this data object that's
  // provided to the action function by React Router.
  // And then we could set the method off the request we're sending to the backend
  // equal to the method that was used for this client side request
  // that was genreated by React Router.
  // Now the method we do set in components/EventItem.jsx inside the proceed if check,
  // does matter because we're using that method in our action here in eventDetail.jsx
  // we could also hardcode DELETE method her but we could also access this
  // method that is set when the form is submitted or when data is submitted
  // in this case with the useSubmit hook and the submit function in EvenItem.jsx
  // That's how we can submit data and trigger an action programatically.
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    // method: 'DELETE'
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      },
    );
  }

  // else if we're successful, we're done. we want to probably redirect the user
  return redirect('/events');
}
