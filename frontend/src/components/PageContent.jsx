import classes from './PageContent.module.css';

// Its a a little helper component that provides us some styling which we'll
// use to render it on the error page i.e pages/Error.jsx
function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
