import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  /* Use Form component from React Router DOM
   * That would automatically trigger the action the belong to the currently
   * active route.
   * The problem is however, that this form is included on all routes because it's
   * part of the main navigation.
   * This NewsletterSingup Component is part of the MainNavigatinon.
   * Therefore we would have to add the action to all routes and that would of course
   * be a lot of code duplication and also clash with other actions that we
   * might need for our routes.
   * Now this is such a common use case that React Router has a solution for it.
   * There is a special hook from React Router DOM called useFetcher hook
   */
  // This hook when executed gives us an object
  const fetcher = useFetcher();

  // just Form component vs fetcher.Form, the difference is, if we use fetcherForm
  // component like this, then this will actually still trigger an action
  // but it will not initialize a route transition.
  // So fetcher should basically be used whenever we wanna trigger, an action
  // or also a loader with the help of the load function without actually
  // navigating to the page to which the loader belongs!
  // On this form here we can add the action attribute and for example, point at
  // /newsletter because we know that we wanna trigger the action off that
  // newsletter route but we wanna make sure that we don't load that route's component.
  // we don't wanna load the element that belongs to this route.
  // And with the default form, we would do that.
  // If we use Form component here without fetcher.Form, then the difference is,
  // we will notice if we set up the form like this with the default form provided
  // by React Router, if we go to localhost:3000/events and we then enter some email
  // address there, We're forwarded to the Events page after submitting this.
  // And that's not the behavior that we want.
  // Now it changes if we use `fetcher.Form`
  // With fetcher.Form, we don't transition, we don't move to a different route.
  // Now using fetcher.Form, if we go to localhost:3000/events and enter email.
  // Now we submit email without transitioning.
  // We can get a feedback by using other properties provided by the fetcher
  // because this `useFetcher` hook is basically the tool we should use if we
  // wanna interact with some action or a loader without transitioning.
  // So if we wanna send our requests behind the scenes, without triggering any
  // route changes and because that's the goal or that's where fetcher wants to
  // help us, this fetcher object also includes a bunch of properties that helps us
  // understand whether our actino or loader that we triggered succeeded.
  // We also get access to any data returned by that loader or action.
  // We get access to that data through that data property here to be precise.
  // We can use object destructuring to pull out that data object which is
  // returned by action or loader that's being loader.
  // And we can also get hold of state object or a state value to be precise
  // which is equal to 'idle', 'loading' or 'submitting' which we know from
  // useNavigation hook.
  // But useNavigation was meant to be used with actual route transitions.
  // The state we get from fetcher instead tells us whether the fetcher behind
  // the scenes completed its loader or action that was triggered.
  // So we can then use this to update the UI accordingly.
  // For example, we could bring back useEffect and trigger a function
  // whenever data and state changed.
  const { data, state } = fetcher;

  // This is also a way of getting access to the data and the state of our behind
  // the scenes action or loader execution
  useEffect(() => {
    // idle means we are not executing an action or loader anymore
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  /* So useFetcher is a tool we wanna use if we wanna trigger a loader or an
   * action without actually loading the page, the route to which this
   * action or loader belongs.
   * And it's perfect for scenarios like newsletter on navigation, where
   * we might have some shared component or a component that's used multiple
   * times on the same page and where we just wanna update or get some data
   * behind the scenes.
   */

  return (
    <fetcher.Form
      method='post'
      action='/newsletter'
      className={classes.newsletter}
    >
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
