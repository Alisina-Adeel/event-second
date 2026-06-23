import { Link } from "react-router-dom";
import type { Event } from "../types/event";

type Props = {
  event: Event;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

function EventCard({ event, isFavorite, onToggleFavorite }: Props) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <h3>{event.title}</h3>
      <p>{event.category}</p>
      <p>${event.price}</p>

      {/* ✅ VIEW DETAILS BUTTON */}
      <Link to={`/events/${event.id}`}>
        <button style={{ marginRight: 10 }}>
          View Details
        </button>
      </Link>

      {/* ❤️ FAVORITE */}
      <button
        onClick={() => onToggleFavorite(event.id)}
        style={{
          color: isFavorite ? "red" : "black",
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default EventCard;