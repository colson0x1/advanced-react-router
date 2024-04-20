import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

// We might want to differentiate between 404 errors and other errors like
// the one we have in our loader function in pages/Events.jsx where we
// actually have an error message that we might wanna display instead of the
// default error message we defined there.
function ErrorPage() {
  // useRouteError gives us an error object
  // And the shape of that object now depends on whether we threw a response
  // or any other kind of object or data.
  const error = useRouteError();
  // error object will now include a status field if we use response constructor
  // If we threw any other kind of object like a regular object instead of
  // response constructor function, then
  // this error object would already be that thrown object. So then there would
  // not be this special status property.
  // But that's why we want to throw responses instead of regular objects in
  // loader fn in pages/Events.jsx --> if (!response.ok) {}
  // because this does allows us to includ this extra `.status` property.
  // that status field in response, which helps with building a generic error
  // handling component.
  // Because now in pages/Error.jsx page, i.e this page, we can create our title
  // and our message and set these two default values but override them with
  // more fitting values based on which error we have.
  let title = 'An error occurred!!';
  let message = 'Something went wrong';
  // We could for example have these default values here but then we can check
  // if error dot status is maybe 500 in which case we might want to keep the
  // title but eet the message to error.data.message;
  // error.data gives us access to data that's included in this error Response
  // that was thrown from pages/Events.jsx and that object has a message and
  // we can assume that most objects that are included in error responses will
  // have message properties.
  // That's why we're accessing the data object of the error response
  if (error.status === 500) {
    // the data object here actually first of all must be convered back to an
    // object because otherwise its still JSON in JSON format.
    // So we must use JSON.parse() and thena access message on the parsed data
    message = JSON.parse(error.data).message;
  }
  // error 404 is the default status set by React Router if we enter a path
  // that's not supported
  if (error.status === 404) {
    title = 'not found!';
    message = 'Cold not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
