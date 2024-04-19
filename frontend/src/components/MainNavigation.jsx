import { NavLink } from 'react-router-dom';
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
            {/*
            WE use NavLink here and add className. We could do that with Link
            too but now, className here receives a function which gets an object
            automatically provided by React Router where we can get the
            `isActive` prop with the help of destructuring
            Then we can use the isActive prop to dynamically add the active class
            which is defined in MainNavigation.module.css file or otherwise,
            alternatively use undefined or render undefined.
            */}
            {/* We gotta problem here, Home link is always active. This happens
            because actually React Router checks for the start of the path
            and we can override that by adding `end` prop here on this Home NavLink.
            This ensures that this link is only treated as active if the currently
            active route ends with this path. */}

            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/events'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
