import { useParams } from 'react-router-dom';

function EventDetailPage() {
  // useParams hook when called in a component function gives us access to the
  // currently active route parameters. So to the values that are encoded in
  // the URL for our dynamic path segments.
  // So for the values used there i.e :eventId on App
  const params = useParams();

  return (
    <>
      <h1>EventDetailPage</h1>
      {/* It's .eventId here because we used `:eventId` as an identifer after 
      the colon. So params.eventId for getting hold of the value with that
      params object. */}
      <p>Event ID: {params.eventId}</p>
    </>
  );
}

export default EventDetailPage;
