import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditEventPage from './pages/EditEvent';
import EventDetailPage from './pages/EventDetail';
// This is simply a pointer at that function which we define and export
// there in Event.jsx
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';

// RouterProvider is needed to apply and activate our route definitions
// createBrowserRouter fn is required to create these route definitions

const router = createBrowserRouter([
  // adding a parent route route for other routes
  {
    path: '/',
    element: <RootLayout />,
    // now all the other routes should be children of the root route
    // converting all the paths in the children to relative paths so that they're
    // relative to the path defined in the parent route here below in the route
    // definitions
    // + turn first route for the HomePage into index route instead of defining
    // empty path
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        // now we have to adjust children routes path
        // so we have couple of relative paths here
        // And now the overall path is constructed from the conbination
        // of /events and whatever path we have down here.
        // And of course this fist route here can again be turned into a index
        // route for this events parent route.
        // Now all these events routes have this new event specific navigation here

        /* loader is a property that wants a function as a value.
         * And this function will be executed by React Router whenever we are
         * about to visit this route.
         * So just before this route gets rendered, just before this JSX code
         * gets rendered i.e index route here as of now,
         * this loader functoin will be triggered and executed by React Router.
         * And it's in this loader function where we can therefore load and
         * fetch our data.
         * So we can go back to event.js and grab the code where we fetch the
         * data and wehre we evaluate the response and cut that and instead
         * move it into this loader function.
         * Now we'll need to tweak the code a little bit to make the code work
         * though. For example, we should add the async keyword here so that
         * we can use the await keyword inside.
         * Alternativelt we could of course use the .then() method since
         * fetch returns a Promise but async await is a bit easier to read.
         *
         * We also don't need to set any state values here inside the loader,
         * so we can get rid of all of that.
         * Instead here, we'll deal with that incorrect response case later
         * and we focus on the scenario that we do have a valid response.
         * In that case, we got the response data in this loader function.
         * And of course, we wanna get that data to that events page component
         * because that's where we need the data.
         * Well, the great thing is, when we define such a loader function,
         * React Router will automatically take any value we return in that
         * function, for example, the response data and will make that data
         * available in that page that's being rendered here as well as
         * any other components where we need it.
         * So we return resData here. To be precise, we wanna return
         * resData.events  because our response data object is actually an
         * object that will have an evvents property which holds the actual
         * array of events.
         * That's simply how the backend API reutrns the response for this
         * request. So we must access .events here to get that array of
         * dummy events from the backend.
         * And with that, this data is made available to the events page and
         * any other components that need the data.
         * How do we get access to that data returned by our loader is, we
         * have to go that component where we wanna use it. Like for example,
         * the events page component.
         */

        /* So we added our loader here. We could argue that while this did
         * improve our component, it actually made this App.jsx file a bit more
         * bloated. And especially if we would add more loaders to more and
         * more routes, this file would start doing a lot of things.
         * We could also argue that the logic for fetching data for the events
         * page belongs to the events page and not to the App.jsx file.
         * So we might want to put that code into the Events page file and not
         * into the App.jsx file.
         * And for those reasons, a common pattern or recommendation is that,
         * we do actually put that loader code here into our component file
         * where we need it.
         * So to the page component file where we wanna add the loader to be
         * precise i.e pages/Events.jsx
         */

        /* Now we can use eventsLoader which is that pointer at that function
        and use that as  a value for this loader property here.
        * And with that, App.jsx is leaner again and doesn't contain the actual
        * data fetching logic. 
        * And at the same time, the pages/Events.jsx component is also still 
        * lean because we outsource that code in a separate function which is now 
        * closer to the component where it's actually needed though.
        * And that is arguably the best of both worlds and how we should typically
        * structure this.
        */

        /* The loader for this page will be called right when we start navigating
        to that page. So not after the page component has been rendered, but
        before we actually go there */
        /* lets introduce delay on the backend/routes/events.js
         * that will simply ensure that the response is only sent back from
         * from the backend to the frontend afer one and half seconds.
         * We're introducing this delay here to see how this is reflected on the
         * frontend.
         * now we go to localhost:3000/ i.e the home page and after that when we
         * click on, events page, we'll see that nothing happens and only after
         * one and a half seconds we go there.
         * So there we click on events, wait and go there to events page.
         * Because the data fetching is initiated as soon as we initiate the
         * route transition.
         * But by default, React Router will actually wait for the data to be
         * fetched so for the loader to be finished before it then renders the
         * page with the fetched data.
         * The advantage of this approach is that we can rely on the data being
         * there once the events page component is being rendered.
         * We don't need to worry about whether the data is there yet or not
         * and therefore we don't need to render a loading state on this
         * events page component i.e pages/Events.jsx or localhost:3000/events
         * The downside of course is that we have this delay where it looks to the
         * user as if nothing is happening.
         * React router gives us a various tools for improving that user experience.
         *
         */
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          { path: ':eventId', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
