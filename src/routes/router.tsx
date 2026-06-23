import { createBrowserRouter, defer } from "react-router-dom";

import EventsPage from "../pages/EventsPage";
import EventDetailsPage from "../pages/EventDetailsPage";
import BookPage from "../pages/BookPage";
import CreateEventPage from "../pages/CreateEventPage"; // ✅ ADD THIS

import { getEventById } from "../api/eventsApi";
import MyBookingsPage from "../pages/MyBookingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EventsPage />,
  },

  {
    path: "/events",
    element: <EventsPage />,
  },

  {
    path: "/create-event", // ✅ FIX HERE
    element: <CreateEventPage />,
  },

  {
    path: "/events/:id",
    element: <EventDetailsPage />,
    loader: async ({ params }) => {
      const id = params.id!;

      return defer({
        event: getEventById(id),
      });
    },
  },

 {
  path: "/book/:eventId",
  element: <BookPage />,
  loader: async ({ params }) => {
    const event = await getEventById(params.eventId!);
    return { event };
  },
},

  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
  {
  path: "/my-bookings",
  element: <MyBookingsPage />,
},
]);