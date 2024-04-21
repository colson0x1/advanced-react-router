import EventForm from '../components/EventForm';

/* There is a better approach when using Reac Router for sending data to the API
 * Just as we can add loaders to load data, we can also add actions to send data.
 */
function NewEventPage() {
  function submitHandler(event) {
    event.preventDefault();

    // we cold extract data from the form with help of two way binding
    // or refs for example.
    // And we could then manually send our HTTP request here. maybe manage
    // some loading and error state and ultimately navigate away from this page,
    // once we're done.
  }

  return <EventForm method='post' />;
}

export default NewEventPage;
