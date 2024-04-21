import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
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

    <Form method='post' className={classes.form}>
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
