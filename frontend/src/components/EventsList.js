// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classes from './EventsList.module.css';

function EventsList({events}) {
  // const events = useLoaderData();

  return (
    <div className={classes.events}>
      <h1>Tutti gli slot disponibili:</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/prenotazioni/${event.id}`}>
              <div className={classes.content}>
                <h2>{event.slot}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
