import { useLoaderData } from 'react-router-dom';
/* Now, ther eis nothing wrong with debt code, but of course it is worth noting
 * that it's a quite some boiler plate code which we have to repeat everytime
 * we're sending a request to a backend.
 * Though we could kind of  mitigate that by creating a custom hook and we could
 * outsource that logic into a custom hook.
 * But nontheless, it's quite some code that must be wirtten to handle these
 * different http request states and to fetch that data.
 * And in addition, what's all the worth nothing is that of course this
 * request will only be sent once we reached this page. So once we navigate
 * it to this page i.e localhost:3000/events
 * So we only start sending that request as soon as we reach the events page.
 * We don't start sending the request any earlier instead only once we reach
 * this page i.e /events page.
 * And that of course means that this entire events page component must be
 * rendered before this request is sent.
 *
 * That's not necessarily a problem. And here it is a pretty straightforward,
 * simple component. But of course in more complex applications,
 * this component could be rather complex and it could also have a bunch of
 * nested child components and having to render and evaluate all these components
 * before we actually start sending that request for that data which we
 * absolutely need, is suboptimal.
 * We could argue that it would be much nicer if React Router would initiate
 * the data fetching as soon as we start navigating to this page.
 * So as soon as we start rendering this component, so to say or even before
 * we render the component.
 * And we then render the component with the fetched data instead of first
 * rendering the component without the fetched data with the laoding state
 * fallback instead and then fetching data after it has been rendered as
 * it's currently happening.
 * It could be preferable to do it the other way around and first
 * fetch the data and then render this component.
 *
 * And that's exactly what React Router allows us to do and where React Router
 * helps us.
 * With React Router at least if we're using version 6 or higher, we don't
 * have to write all that code like below for handling these different states.
 * Instead, React Router helps us with all of that.
 * It helps us with all of that by giving us an extra property which we can add
 * to our route definitions.
 * Now we're currently talking about this events page.
 * That's this page where we're fetching data and in our route definitions,
 * we can add an extra property to that route definition of that page.
 * We can add the extra loader property.
 */
import EventsList from '../components/EventsList';

/* To get access to the data returned by our loader, here as a first step, we
 * can get rid of all the remaining code which we had in here before. all that
 * state management and useEffect and get rid of this div here in the return
 * which shows our loading and error states.
 * We can implement those states in the near future.
 * Also remove the checks and just return events like below and also we can
 * get rid of those removed imports.
 * And now to get access to the data returned by the loader functoin for this
 * page, 'useLoaderData' from react router dom.
 * This is a special hook which we can execute to get access to the closest
 * loader data.
 * So here we now get our data, by calling 'useLoaderData'. we could also name
 * it events since we know that it will be a list of events.
 * And events here will really be that data returned by that loader.
 * Now since we're using async await, technically this loader function will
 * return a promsie. Any data returned in that loader function will be wrapped
 * by a promise, that's how async await works.
 * But React Router will actually check if a primise is returned and automatically
 * get the resolved data from that promise for you.
 * So we don't need to worry about whether we're returning a promise here or not,
 * we'll always get the final data that would be yielded by the promise with
 * the help of useLoaderData.
 * And therefore now it's this events object, this array of events, which
 * we can pass as a value to this events prop on events list.
 * If we save that all, we will see that we got the same result as before,
 * we got this list of events, in this case only one event, but if we had
 * multiple events returned by the backend, we would see multiple events here on
 * localhost:3000/events
 * And we got this all due to the code we wrote in this loader.
 * And ofcouse that's much less code than what we had before, and it's also not
 * part of the component function, which makes the component function way
 * leaner and easier to reason about.
 */
function EventsPage() {
  const events = useLoaderData();

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;
