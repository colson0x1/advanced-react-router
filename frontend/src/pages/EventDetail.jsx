// we use useRouteLoaderData instead of useLoaderData whenever we use want to
// get access of the loader in the parent route which has ID specified
import { Suspense } from 'react';
import {
  Await,
  defer,
  json,
  redirect,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  // useParams hook when called in a component function gives us access to the
  // currently active route parameters. So to the values that are encoded in
  // the URL for our dynamic path segments.
  // So for the values used there i.e :eventId on App
  // const params = useParams();

  // this hooks almost works like a useLoaderData but it takes a route ID as
  // an argument
  /* const data = useRouteLoaderData('event-detail'); */
  // We now know that here, we'll get an object that has an event and events key
  // These are these two deferred requests so to say.
  const { event, events } = useRouteLoaderData('event-detail');

  // now we can visit the single events and view the details

  // Here we're only outputting the EventItem.
  // Besides the EventItem, we also wanna output our EventsList here.
  // So therefore, we of course must fetch the events on this page here as well.
  // To do that, we'll quickly copy that loadEvents function from pages/Events.jsx
  // We could also store it in another shared file and export it.
  // So paste it here above our loader function here.
  // We'll also add another function which we'll name loadEvent, where we expect
  // to get ID of an event and we'll put the code from loader function which is
  // responsible for loading a single event into this loadEvent helper function here.
  // Just as before, we'll change this return value of loadEvent fn i.e return response
  // to manually extract the data.
  // So just as in load events, we'll use the json() method and await it and then
  // return resData.event here in the end.
  // So now we got these two helper functions and we'll now use it here in
  return (
    // Now we need the Await Component, and we use that Await component two times
    // to await these two different requests.
    // So on first Await, we pass event to the resolve prop and on second Await
    // component, we pass events to the resolve prop.
    // Then we got these dynamic values between the opening and closing Await tags
    // where we got our event in this first case which we named example as loadedEvents
    // where we then wanna output the event item once that data is there.
    // And for the second Await block, we got our loadedEvents and we will output
    // those here.
    // Now we also need Suspense Component and every Await block must be wrapped
    // with its own Suspense Component. Otherwise Suspense will wait for both
    // Awaits to complete before showing  anything, which is not what we want.
    // So we need to import Suspense and then add our fallback here.
    // Again a paragraph where we maybe say loading...
    // We'll use the same fallback block down there on the second Suspens to
    // wrap our second Await
    // Now what does this do?
    // While if we save that all, and click on: localhost:3000/events
    // and click on any one event, we'll see that te details were there basically
    // immediately. But the list of events was still loading.
    // The links in that nested list would now be broken. To fix that, we
    // would have to go to EventList.jsx and convert those links to absolute links.
    // Since we can now end up in situations where this component i.e EventsList
    // is rendered on a page where adding this to the currently active path
    // would lead to an overall incorrect path. Not related to deffering but we have to fix.
    // So what we do get is now a page that's instantly available, while still
    // loading other data tha's not instantly available.
    // However, this is still not the perfect solution.
    // The backend here is super fast, but we can sometimes see a loading message
    // here during opening any event on events page,
    // so a loading message for these details, for a short fraction of a second
    // because we're actually deferring both pieces of data.
    // The single event and all events in the loader fn.
    // Now it would make sense to tell React Router that it should maybe await
    // with displaying the event details page until the details have been loaded
    // so the navigation should only start once the details have been loaded.
    // But it should then load the list of events after we navigate it here on
    // specific event page.
    // And defer gives us that fine grain control.
    // If we have a async loader with the async function, we can simply add the
    // await keyword here inside the loader function and that will make sure
    // that defer awaits for this data to be loaded before loading this page
    // component at all.
    // i.e await loadEvent(id)
    // So before moving and navigating to this page component.
    // But will load this data i.e events: loadEvents(), the loadEvents data,
    // after the page was loaded.
    // So await is our lever, our switch for controlling which data should be
    // awaited before moving to this page i.e event: await loadEvent(id)
    // and which data shuold be deferred, so where we wanna load the data
    // after moving to the page i.e events: loadEvents()
    // And with this setup here, we would await for the event details to be
    // loaded before loading this page component at all i.e event: await loadEvent(id)
    // But we would load the list of events after rendering this page
    // i.e events: loadEvents()
    // on the site, we won't see a big difference but it will actually ensure that
    // we never see a loading text here for the event details
    // i.e localhost:3000/events from there going to individual event
    // And that's how we can use defer to control when which data is loaded!!
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
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
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events!' },
      {
        status: 500,
      },
    );
  } else {
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

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

  // this loader function because here we now want to actually defer again.
  // So we'll return defer and for that of course we must import defer and
  // we will defer here because we know that load events will take a while
  // because we have this two second time out on the backend, whereas
  // loadEvent functino should be rather fast.
  // Let's see how defer can load some data while still waiting for other data.
  // So here we're calling defer, we're passing object to it.
  // And we have our single event where we'll call loadEvent and pass this ID
  // which we extracted from params, to loadEvent and we have events where
  // we call loadEvents like that. And of course that should also be executed.
  // So now this is looking similar to what we had before in the pages/Events.jsx
  // file but we have two requests  that are bundled in this defer object!!
  //
  // Now with that done, we're using useRouteLoaderData here, but that works with
  // defer just as useLoaderData did

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
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
