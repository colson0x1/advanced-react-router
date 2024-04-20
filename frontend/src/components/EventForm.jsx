import { Form, useNavigate } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
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
        <button type='button' onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
