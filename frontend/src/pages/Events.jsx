import { Suspense } from 'react';
import { json, useLoaderData, defer, Await } from 'react-router-dom';

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
  /* const data = useLoaderData(); */
  const { events } = useLoaderData();

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
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;

  return (
    // So here in this Component we now don't directly render the component
    // or the JSX code that needs our data.
    // i.e <EventsList events={events} />
    // Instead what we do in here is we return another Component provided
    // by React Router DOM and thats the await Component.
    // So we render await here.
    // And await has a special resolve prop which wants one of our deferred
    // values as a value.
    // So here on this data object we know that we have an events key  because
    // that's what we set below. SO this data object here will have the keys we
    // set in that object that we pass to defer.
    // And that events key in the end will hold a Promise as a value.
    // So its kind of that promise which we wanna pass to this resolve value of the
    // await component.
    // i.e above: const data = useLoaderData();
    // So there we'll actually use object destructuring to get our events key
    // and pass this to resolve here, like this.
    // Now that Await Component will wait for that data to be there.
    // And than between the opening and closing tags, we output a dynamic value
    // which must be a function that will be executed by React Router once
    // that data is there. So once that promise rsolved. Once we have that data.
    // i.e once resolve={events} resolved
    // So here, we therefore get our events in the end, our loadedEvents if we wanna
    // call it like this. Again this function will be called by React Router
    // once the data is there.
    // And it's therefore now here where we wanna out put our EventsList
    // and pass these loaded events as a value for the events prop.
    // Now as a last step, we have to add another Component that must be wrapped
    // around the Await Component. And that's the Suspense Component which is
    // imported from React. So not from React Router but from REACT!
    // The Suspense Component is a Component which can be used in certain
    // situations to show a fallback whilst we're waiting for other data to arrive.
    // It's used in other totally different scenarios too which is not related to
    // Routing.
    // But here it is a Component that's supported and used by React Router
    // and by the await Component to show a fallback whilst we're waiting
    // for these events to be fetched.
    // So here the fallback which we do wanna show is actually a paragraph where
    // we say loading.
    // And that's how we can defer data loading.
    // A couple of steps as we can tell.
    // But now with that we'll load this EventsPage Component and render
    // this component before we have the data.
    // And we will show this fallback until the data is there.
    // So now if we go to home / and to events: localhost:3000/events
    // We see that loading text here. And then after two seconds we get an error.
    // Now we're getting this error because in our loadEvents helper function
    // we're still returning the response i.e return response;
    // And whilst this did work before, where this was the value that was
    // received directly by useLoaderData, this does not work anymore if we
    // have this, the first step, in between. i.e return response
    // What we have to instead is we have to manually parse that there.
    // So here we got our response data by awaiting response.json()
    // And there we return resData.events in this loadEvents helper function.
    //

    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

/*
 * Lazy loading
 * It would make sense to show these buttons already, the all events and new
 * event buttons, even if the list of events hasn't been loaded yet.
 * But at the moment we don't see anthing when we go from localhost:3000/ to
 * localhost:3000/events until the events are there
 * Due to the delay time of 2 seconds we added in backend
 * And that's where we can defer loading and tell React Router that we
 * actually wanna render a component already even though the data is not fully
 * there yet.
 * And that's exactly what we'll implement now.
 * On pages/Events.jsx where we're loading these events we do implement this feature.
 * And in order to defer loading that, what we need to do here is,
 * we need to grab that code from loader and outsource it into a separate function,
 * an async function which we'll name loadEvents and put the code in there.
 */

// Here we can simply export a function which we could name loader or something,
// and we put our code, our loader code into this function
// we'll turn this fn to async await
// Now with this, this loader code is in this function.
// Back in App.jsx, we can simply import that loader and give it an alias
// like eventsLoader
// It's almost the same code as before just wrapped into a separate function
// That's required because we have just the first step between our loader
// and useLoaderData.
// With that if we now go to home and back to events, we get this loading
// text here and we see those events here.
// So that's the defer feature in action!
// And this defer feature can speed up our pages and make sure that we're
// already showing some content whilst we're waiting for other content.
// It especially shines if we have pages with multiple HTTP requests with
// different speeds, though!!

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events!' },
      {
        status: 500,
      },
    );
  } else {
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

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
/* export async function loader() { */
// const response = await fetch('http://localhost:8080/eventssss');
/* const response = await fetch('http://localhost:8080/events'); */

// Handling error
// If the response code is not ok, if it has 400ish or 500 ish response code:
// What we can do in that case is we can return a different response,
// for example, or just return an object. Doesn't have to be a response.
// where we could add isError key and message.
// So now we return this data package instead of the response returned by our
// API request here.
/* if (!response.ok) { */
// return { isError: true, message: 'Cold not fetch events.' };
/* An alternative error handling i.e alternative to returning this data
 * here to the component, we could throw an error.
 * For this we can construct a new error object with the builtin error
 * constructor function or we throw any other kind of object as an error.
 * And here we could then also, for example: include a message.
 * Now when Error gets thrown in loader, something special happens.
 * React Router will simply render the closest error element.
 * We have added `errorElement` on the root route of App.jsx to have
 * a fallback page that would be displayed in case of 404 errors.
 * So if we navigated to paths that aren't supported.
 * Well, turns out that error element is not just there to show a fallback page
 * in case of invalid route paths.
 * That is one use case but not the only one.
 * Instead the error element will be shown to the screen whenever an error
 * is generated in any route related code, including loaders.
 * So therefore, what we can do is, we can add error page again in pages/Error.jsx
 * and create our error page component and export it.
 * Now we can go to App.jsx and add `errorElement` prop to root route.
 * With that, the Error page in pages/Error.jsx will be displayed whenever
 * we basically have any kind of error anywhere in our routes because even
 * though we're throwing an error here in the loader of the events page.
 * We can also add that errorElement prop to deeply nested routes as well
 * like the index route and in that case, this errorElement would be rendered
 * if this loader threw an error.
 * But we can also just have this Root level error element and the error will
 * bubble up until it reaches that route in App.jsx
 *
 * */
// throw { message: 'Could not fetch events..' };
// To differentiate between 404 and other errors what we can do is, instead
// of throwing a object, we can throw a response by again creating a new
// response. And then we can include some data into that response.
// For this we have to call JSON.stringify() if we want to pass object to the
// response and then we could add a message prop. and now we can add second
// argument to this response constructor and set the status for example to
// 500 to indicate that something went wrong on the backend.
// We're doing this because we can actually get hold of the data that's
// being thrown as an error inside of the component that's being rendered
// as an error element.
// And for that, React Router DOM gives us another special hook called
// useRouteError hook. -> pages/Error.jsx
/* throw new Response(JSON.stringify({ message: 'Could not fetch events!' }), {
      status: 500,
    }); */
// When using, React Router, we'll from time to time construct responses as
// we're doing it above especially when it comes to throwing errors.
// Constructing responses manually like this is possible but a bit annoying.
// That's why React Router gives us a little helper utility.
// Instead of creating our responses like that above, and returning in the
// else, we can return the result of calling json.
// json is a function that can be imported from react-router-dom
// json is a function that creates a response object that includes data
// in the json format
// To this json function, we simply pass our data that should be included
// in the response and we don't need to convert it to json manually.
// Instead it wil be done for us. And we can pass a second argument where
// we can set that extra response metadat like this status,
// And here we set the status to 500 again.
// With this json fn, we don't just have to write less code here but in the
// place where we use that response data, we also don't have to parse the
// json format manually. instead we can simplify the code (i.e remove JSON.parse())
// because the parsing will now be done by React Router for us in the
// pages/Error.jsx
/* throw json(
      { message: 'Could not etch events!' },
      {
        status: 500,
      },
    );
  } else { */
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
/* return response;
  }
} */

// We're doing this because in the loader we now don't want to await this promise
// here. Instead here we can actually get rid of this async keyword
// and use a special function in this loader function.
// The defer function which should be imported from React Router DOM.
// Now defer is a function that must be executed and to defer we pass an object.
// Now in this object, we in the end, bundle all the different HTTP requests
// we might have going on this page.
// In this case its one request though. i.e The request for all our events.
// We'll give that request a key of events for example (we can name anything)
// and then here, we'll point at load events.
// We'll not just point at it, instead we'll execute it.
// And we store a value returned by load events which is a promise, since this is
// async function, in this object inside defer, under the events key.
// Now we must have a promise here i.e on events: loadEvents()
// If we wouldn't have a promise, there would be nothing to defer because the
// idea behind defer is that we have a value that will eventually resolve
// to another value, which is the definition of a Promise.
// And that we wanna load a component and render a component even though that
// future value isn't there yet.
// So load events returns a promise, it must return a promise and it does.
// And we store that promise under the events key in this object which we pass to
// defer.
// And its now this value returned by defer which we return in our loader.
// Now this is not everything we have to do though.
// Instead now, as our next step, we have to go the component where we want to
// use the deferred data and we still use loader data here.
// i.e const data = useLoaderData();
// But this data will no actually be an object that gives us access to these
// defferd value keys here. So to events, in our case.
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
