import { Link } from "react-router-dom";

type Props = {
  event: any;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function EventCard({
  event,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div style={styles.card}>
      {/* HEADER */}
      <div style={styles.header}>
        <h3 style={styles.title}>{event.title}</h3>

        <button
          onClick={() => onToggleFavorite(event.id)}
          style={{
            ...styles.heartBtn,
            color: isFavorite ? "#ef4444" : "#9ca3af",
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* CATEGORY BADGE */}
      <span style={styles.badge}>{event.category}</span>

      {/* PRICE */}
      <p style={styles.price}>💲 {event.price}</p>

      {/* FOOTER */}
      <div style={styles.footer}>
        <Link to={`/events/${event.id}`}>
          <button style={styles.button}>View Details</button>
        </Link>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles: any = {
  card: {
    background: "linear-gradient(145deg, #ffffff, #f8fafc)",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: "#111827",
  },

  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    background: "#6366f1",
    color: "white",
    fontSize: 12,
    fontWeight: 600,
    width: "fit-content",
  },

  price: {
    fontSize: 16,
    fontWeight: 600,
    color: "#16a34a",
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  button: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#6366f1,#4f46e5)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
  },

  heartBtn: {
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    transition: "0.2s",
  },
};