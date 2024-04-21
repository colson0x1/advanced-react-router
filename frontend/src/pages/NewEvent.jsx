import { json, redirect } from 'react-router-dom';
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

  return <EventForm />;
}

export default NewEventPage;

// Now in this action function, we can send request to the backend
// It's important to understand and keep in mind is that we're still on the
// client side here.
// Just as with loader, this is code that executes in the browser. This is not
// backend code. We can access any browser API here like for example local storage
// but very often we might want to send the reqest with the good old fetch function

// Now the great thing about React Router is that it makes handling form submissions
// a brace and it helps with extracting data from that form.
// For that we should go to the form and make sure all our inputs have the
// name attribute because those names will later be used for extracting the data.

// To get hold of the request that is captured by React Router and forward to that
// action, we have to use the data that's passed to this action function
// because just as a loader function, the action function is executed by
// react-router and it receives an object that includes a couple of helpful properties
// To be precise, the request and params properties.
// Now this time, we are not interested in the params because we have no params here
// when creating a new event but we're interested in the request object
// because that request object contains the form data.
// To get hold of that form daata, we have to call the special form data method
// on the request object and await it.
// That will give us a data object that includes this form data.
// And on this data object, we can call the get method to get access to the
// different input field values that were submitted.
// To `get` we pass a string with the different identifiers of our input fields.
// So that would be the values we chose as names for the input fields like title
// or image in our case.
// So that's how we can extract this submitted form data with the help of that
// request that's forwarded or that's passed into this action function by
// React Router.
export async function action({ request, params }) {
  const data = await request.formData();

  // const enteredTitle = data.get('title');
  // or
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  // this will give us a response and we await this here and then we can look
  // into this response, extract the return data and do whatever we need to do.
  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    // we have to convet that eventData to JSON to send it to the backend
    // also add some extra headers so that the data is handled and extracted
    // correctly on the backend
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422 ) {
    return response;
  }

  // we can for example check if its not ok
  if (!response.ok) {
    // json works for loaders as well as for actions
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  // but nothing seems to happen when we submit the new event form
  // the data is creaed like we can see when we visit all events
  // but during submission, we don't get a feedback.
  // What we want to happen is that we navigate the user away to a different page
  // after successfully submitting the form.
  // redirect like json is a special function from React Router DOM
  // like json, redirect creates a response object.
  // However its a special response object that simply redirects the user
  // to a different page.
  // Now the heavy lifting is handled behind the scenes by React Router.
  // Here, we just specify the path to which we wanna redirect the user and
  // React Router will take care about the rest.
  return redirect('/events');
}
