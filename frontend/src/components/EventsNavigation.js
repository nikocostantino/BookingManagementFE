import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/prenotazioni"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Slot Disponibili
            </NavLink>
          </li>
          {token && <li>
            <NavLink
              to="/prenotazioni/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Event
            </NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
