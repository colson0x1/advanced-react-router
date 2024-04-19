import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* 
            We're using deliberately using an absolute path here because it
            should always lead back to the starting page and not add anything
            after the path of the currently active route. That's now what 
            should happen
            */}
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/events'>Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
