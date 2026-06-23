import { BrowserRouter, Routes, Route } from "react-router-dom";

import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import "./styles/ui.css";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;