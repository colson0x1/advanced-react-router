import { useEffect, useState } from 'react';

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

function EventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        setError('Fetching events failed.');
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;
