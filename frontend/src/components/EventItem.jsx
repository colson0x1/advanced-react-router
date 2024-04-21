import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  // just as we can navigate programatically, we can also submit data and
  // trigger an action programatically using useSubmit hook from React Router DOM
  // This gives us a submit function which we're storing in a constant here.
  const submit = useSubmit();

  function startDeleteHandler() {
    // prompt the user if they want to delete the event
    // this will return a boolean
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      // if its true, trigger an action that goes ahead and deletes this event
      // now we can call this submit function here, if we wanna proceed and
      // to this submit function, we can pass two arguments.
      // The first argument is the data that we wanna submit and that data
      // will automatically be wrapped in a form data object, which we then
      // could extract with this special form data method
      // But here we don't need data, so we can set it to null
      // The second argument then allows us to basically set the same values
      // we could set on a form for example, the method which we can set to
      // delete in this case which would be an appropriate method for this client
      // side request, which is handled on the client side and which triggers this
      // action function
      // We could set the action key to a different path if our action would be defined
      // on a different route path
      // like we can do: submit(null, { method: 'delete', action: '/a-different-path'});
      // But in this case, its defined on the same route to which this component
      // belongs in the end, or for which this component is rendered in the end
      // and therefore we don't need to set the action.
      // Now we want to use this in pages/EventDetail.jsx
      submit(null, { method: 'delete' });
    }
  }

  // If we directly use Form component from React Router here, then in that case,
  // we wouldn't be prompted for whether we want to proceed. we wouldn't see
  // this confirmation prompt
  // We wanna see that to give the user a chance of canceling the deletion process.
  // So we need to trigger that action and submit some data, so to say, programmatically
  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to='edit'>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
