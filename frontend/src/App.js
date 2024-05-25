import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import AutheticatioPage, {action as authAction} from './pages/Authentication';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
//import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import {action as logoutAction} from './pages/Logout';
import { checkAuthToken, loader as tokenLoader } from './util/auth';
import { Suspense, lazy } from 'react';

//questo serve per caricare le cose quando le cose sono richieste
const EventsPage = lazy(()=>import('./pages/Events'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />},
      {
        path: 'prenotazioni',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <Suspense><EventsPage /></Suspense>,
            //loader: eventsLoader,
            loader: () => import('./pages/Events').then((module)=>module.loader()),
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthToken,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthToken,
          },
        ],
      },
      {
        path: 'auth',
        element: <AutheticatioPage />,
        action: authAction 
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
