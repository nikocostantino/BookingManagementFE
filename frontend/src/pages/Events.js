import { Suspense } from 'react';
import { useLoaderData, json, defer, Await, useSearchParams } from 'react-router-dom';
import EventsList from '../components/EventsList';
import Calendar from '../components/Calendar';

function EventsPage() {
  const { events } = useLoaderData();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get('date');

  return (
    <div>
      <Calendar />
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <p>Selected data : {selectedDate}</p>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default EventsPage;

/*async function loadEvents() {

  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}*/

async function loadAvailableSlot(date) {

  console.log("date to search: "+date)

  const response = await fetch('http://localhost:8081/home/getTodayAvailableBookings');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch bookings.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.bookings;
  }
}

/*export function loader() {
  return defer({
    events: loadEvents(),
  });
}*/

export function loaderAvailableBookings({ request }) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

  return defer({
    events: loadAvailableSlot(date),
  });
}
