import { Form, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();

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
