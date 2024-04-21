import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();

  // gives us access to the data returned by our action
  // It gives us access to the closest action
  // and if we return a response in an action, this response is automatically
  // parsed by React Roter for us just as it is the case for loaders
  // And therefore here, this data is the data that we return on our backend
  // incase of validation errors
  // and that would be an object with a general message and a nested errors
  // object which has different keys for the different inputs with more
  // detailed error messages in backend/routes/events.js
  const data = useActionData();

  // gives us navigation object
  // we can extract various pieces of information from navigation object
  // for example: all the dat that was submitted
  // but we can also find out what the current state, of the currently active
  // transition is.
  // And we have a transition from one route to another if we click a link.
  // But we also have a transition if we submit a form.
  // And therefore, we also get information about the current data submission
  // process and whether it completed already
  // So whether the action that was triggered completely already
  const navigation = useNavigation();
  // SO here we can add a helper constant called isSubmitting and in there, we
  // simply store the result of comparing navigation.state to submitting.
  // if the current state is submitting, we know that we are currently submitting
  // data so that the action that was triggered is currently still active
  // WE can use that isSubmitting field to disable button down below on return
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  // next, we should replace the form element with the special Form component
  // which is provided by React Router Dom
  // Now this Form tag will make sure that the browser default of sending a
  // request to the backend will be omitted but it will take that request
  // that would've been sent and give it to your action
  // And that's pretty useful because that request will contain all the data
  // that was submitted as part of the form.
  // Therefore we should add the method property and set this to post for example
  // though this Form component also supports other HTTP  methods like delet or patch
  // But this request and that's important, will not be sent to the backend
  // automatically but instead to our action.
  // And it will include all the form data if we use this special Form component
  return (
    // THe typical and default way is to use this special Form component offered
    // by React Router. that's the standard way we should use.
    // This form will automatically trigger the action function of the
    // currently active route. So the route for which this form was loaded.
    // Now we could send the request to the differnt route by adding
    // the action prop here to this form component and setting this to any
    // other path. Then in that case, the action of another path of another
    // route definition object, would be triggered.
    // So if we had an action on some other route here, we could point at that
    // action by simply setting the form's actino prop value to the path
    // of the route for which we wanna trigger the action. but if we wanna
    // trigger the action, of the currently active route, we don't need the
    // action prop.
    // <Form method='post' action='/any-other-path'> ... </Form>

    <Form method={method} className={classes.form}>
      {/* Check if data is set because it will not be set if we haven't submitted
      the form yet for example
      Because that data is coming from an action. 
      Object.values get us keys of the error object and we're maaping it 
      * Doing this, we get error message if we remove 'required' props from 
      * dev tools inspect elements for all input fields. i.e we get serverside
      * error message this time on localhost:3000/events/new new event page form.
      * These error messages are coming from my action where we return that response
      * which we're getting from the backend and then picking up that return data
      * from the action with the help of useActionData and we're outputting the
      * data that's part of that return reponse here in our JSX code
      */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

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

// refactor a code in this action to make it a bit more dynamic to be able to send
// both a request for adding a new event as well as for editing an existing event.
// in our Form above, we can use post for creating new event and patch for
// updating the event. so to make it dynamic use the method prop on the form method
// And now this could be set from inside the NewEvent and from inside EditEvent
// in pages/NewEvent, we could set method to 'post' on EventForm and
// in pages/EditEvent, we could set EventForm to method of 'patch'
// now we can get access to that method in our action on this request object
// this method can be used to set the method of the request that we're sending to
// the backend
export async function action({ request, params }) {
  const method = request.method;
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
  // Now the url also needs to be changed. It's not always the same!

  // now we have a dynamic way of sending a request to different URLs with
  // different methods but with always the same data depending on how this
  // action was triggered
  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    // means we're editing an event
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method: method,
    // we have to convet that eventData to JSON to send it to the backend
    // also add some extra headers so that the data is handled and extracted
    // correctly on the backend
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
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
