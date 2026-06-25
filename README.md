# 🎟 Event Booking App

A modern **React + TypeScript Event Booking Platform** that allows users to browse events, book tickets, and manage bookings with a smooth multi-step booking flow.

---

## 🚀 Features

- 🎫 Browse events from API (JSON Server)
- 🔍 Search, filter, and sort events
- ❤️ Favorite events system
- 📄 Event details page
- 🧾 Multi-step booking flow
- 📊 My Bookings page (Upcoming / Past / Cancelled tabs)
- ❌ Cancel bookings with optimistic UI updates
- 🎨 Light / Dark theme support
- ⚡ React Query caching for performance
- 🧠 Redux Toolkit for event creation form state

---

## 🛠 Tech Stack

- React + TypeScript + Vite
- React Router DOM
- React Query (@tanstack/react-query)
- Redux Toolkit
- Axios
- JSON Server (mock backend)
- Inline CSS styling

---

## 📁 Project Structure

```text
src/
│
├── api/
│   ├── bookingsApi.ts
│   ├── eventsApi.ts
│   ├── useBooking.ts
│   └── useCancelBooking.ts
│
├── components/
│   └── EventCard.tsx
│
├── context/
│   └── ThemeContext.tsx
│
├── hooks/
│   ├── useEvents.ts
│   ├── useBookings.ts
│   └── (other hooks)
│
├── pages/
│   ├── EventsPage.tsx
│   ├── EventDetailsPage.tsx
│   ├── BookPage.tsx
│   ├── MyBookingsPage.tsx
│   └── CreateEventPage.tsx
│
├── store/
│   ├── store.ts
│   └── createEventSlice.ts
│
├── routes/
│   └── router.tsx
│
├── types/
│   └── event.ts
│
└── main.tsx


🚀 Project Setup Instructions
1️⃣ Start the Backend (JSON Server)

Open a terminal and run:

Bash:
npx json-server --watch db.json --port 3001

👉 Backend API will run at:

http://localhost:3001
2️⃣ Start the Frontend (React App)

Open another terminal and run:

Bash:
npm run dev

👉 Frontend will start at:

http://localhost:5173
⚠️ Important Notes
The backend (JSON Server) must be running before starting the frontend.
If the backend is not running, events and bookings will not load.
Make sure both terminals are running simultaneously.
