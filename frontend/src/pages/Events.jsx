import { useLoaderData } from 'react-router-dom';

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

/* To get access to the data returned by our loader, here as a first step, we
 * can get rid of all the remaining code which we had in here before. all that
 * state management and useEffect and get rid of this div here in the return
 * which shows our loading and error states.
 * We can implement those states in the near future.
 * Also remove the checks and just return events like below and also we can
 * get rid of those removed imports.
 * And now to get access to the data returned by the loader functoin for this
 * page, 'useLoaderData' from react router dom.
 * This is a special hook which we can execute to get access to the closest
 * loader data.
 * So here we now get our data, by calling 'useLoaderData'. we could also name
 * it events since we know that it will be a list of events.
 * And events here will really be that data returned by that loader.
 * Now since we're using async await, technically this loader function will
 * return a promsie. Any data returned in that loader function will be wrapped
 * by a promise, that's how async await works.
 * But React Router will actually check if a primise is returned and automatically
 * get the resolved data from that promise for you.
 * So we don't need to worry about whether we're returning a promise here or not,
 * we'll always get the final data that would be yielded by the promise with
 * the help of useLoaderData.
 * And therefore now it's this events object, this array of events, which
 * we can pass as a value to this events prop on events list.
 * If we save that all, we will see that we got the same result as before,
 * we got this list of events, in this case only one event, but if we had
 * multiple events returned by the backend, we would see multiple events here on
 * localhost:3000/events
 * And we got this all due to the code we wrote in this loader.
 * And ofcouse that's much less code than what we had before, and it's also not
 * part of the component function, which makes the component function way
 * leaner and easier to reason about.
 */

/* where else can we use it?
 * we could also use it directly inside the EventsList component.
 * So instead of using it here, and instead of importing it here,
 * we could go to this EventsList component and use this hook there.
 *
 * We just have to be careful, that if we're not accidentally using useLoaderData
 * on a higher level than we're fetching the data!
 */
function EventsPage() {
  // we can return response like this too and use the loaderData to automatically
  // give us the data that's part of the response.
  // Now we do have to make sure that we extract our events from the data object
  // because that is actually an object with an events key, just as we
  // extracted events from the response data in our loader function.
  // WIth that we can reduce our loader code and leberage this builtin support for
  // response objects.
  // Hence, this special kind of return object is supported by React Router and
  // its loader functions.
  const data = useLoaderData();

  // In our component code, we could now simply check, if this error property
  // which we set exists, and is truth, and if that's the case, we could
  // return a paragraph where we output error message
  // With this, we still have  a pretty lean component.
  // We only added this code here and we have the error generation and handling
  // code in our loader where it belongs, arguably.
  // We can check the error by adding wrong path that doesn't exist on the backend
  // on the loader function in fetch
  // So that's one way of handling errors. SImply returning data that indicates
  // that we have an error and then suing that data appropriately in the component.
  if (data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// Here we can simply export a function which we could name loader or something,
// and we put our code, our loader code into this function
// we'll turn this fn to async await
// Now with this, this loader code is in this function.
// Back in App.jsx, we can simply import that loader and give it an alias
// like eventsLoader

/*
 * // What kind of code goes into the loader function!
 * This might look like backend code. It might look like its decoupled from
 * React application and it kind of is.
 * But, this code that's defined in the loader, executes inthe browser,
 * not some server.
 * This means, we can use any browser APIs in our loader function. We can for
 * example access local storage, cookies, .. we can do anything that we can
 * do in JavaScript code as well.
 * What we can't do in our loader function is for example use React hooks like
 * useState. That does not work because those hooks are only available
 * in React Components and the loader function is not a React Component.
 * But that's the only limitation. Any other default browser features
 * can be used in loader functions
 */
export async function loader() {
  const response = await fetch('http://localhost:8080/event');

  // Handling error
  // If the response code is not ok, if it has 400ish or 500 ish response code:
  // What we can do in that case is we can return a different response,
  // for example, or just return an object. Doesn't have to be a response.
  // where we could add isError key and message.
  // So now we return this data package instead of the response returned by our
  // API request here.
  if (!response.ok) {
    return { isError: true, message: 'Cold not fetch events.' };
  } else {
    /* const resData = await response.json(); */
    // One important aspect of a loader is that we can return any kind of
    // data in this loader.
    // Here we're returning this events property or the values stored in
    // events property of our response data and in this case it will actually
    // be an array that we want to return.
    // We could return a number, some text an object, .. whatever we want.
    // And what we can also return is an response object
    // The meaning of that is:
    // Well, in the browser we can create a new response object lets call it
    // res, by instantiating the builtin response constructor function.
    // Now this is built into the browser. This is a modern browser feature.
    // We can build our own responses and what's really important to understand
    // at this point is, that this loader code in this async function, will not
    // execute on a server!!
    // This is all happening in the browser here even though it's (loader fn implementation)
    // not in a component, it's still in the browser.
    // This is still clien side code. That's really important.
    // None the less we can create response here because the browser supports
    // this response constructor and response object.
    // Now this, response constructor also takes any data of our choice as a
    // first argument and then we can configure it with greater detail with
    // help of an extra object that can be set as a second argument.
    // For example, we could set the state code of our response here
    // Now, whenever we return such a response in our loaders, the React Router
    // package will automatically extract the data from our response when
    // using useLoaderData.
    // So the data returned by useLoaderData will still be the response data
    // that was part of the response we returned in our loader.
    // Now that might not seem too useful here because why would we create a
    // separate response object if we can just return the data like this:
    // i.e return resData.events
    // This is way shorter too.
    // Well, it is, but this feature exists because its quite common that in
    // this loader function, we reach out to some backend with the browser's
    // built in fetch function.
    // And this fetch function actually returns a promise that resolves to a
    // response.
    // Now combined with React Router's support for this response object and
    // its automatic data extraction, that simply means that we can in the end,
    // take that response which we get here,
    // so this response object i.e const response = await fetch('.../events')
    // and return that in our loader
    // We don't need to manually extract data from the response
    /* const res = new Response('any data', { status: 201 });
    return res; */

    // Instead we can return the response like this with or without checking
    // whether its okay
    /* return response; */
    // But we can just return response like this:
    return response;
  }
}
