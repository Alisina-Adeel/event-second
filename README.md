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
src/
│
├── api/ # API calls (events & bookings)
├── components/
│ ├── EventCard.tsx
│ └── hooks/
│ ├── useEvents.ts
│ ├── useBookings.ts
│ └── useCancelBooking.ts
│
├── context/
│ └── ThemeContext.tsx
│
├── pages/
│ ├── EventsPage.tsx
│ ├── EventDetailsPage.tsx
│ ├── BookPage.tsx
│ ├── MyBookingsPage.tsx
│ └── CreateEventPage.tsx
│
├── store/
│ ├── store.ts
│ └── createEventSlice.ts
│
├── routes/
│ └── router.tsx
│
├── main.tsx