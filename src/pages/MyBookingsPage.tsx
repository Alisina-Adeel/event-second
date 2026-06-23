import { useState } from "react";
import { useBookings } from "../hooks/useBookings";
import { useCancelBooking } from "../api/useCancelBooking";

export default function MyBookingsPage() {
  const userId = "user1";
  const [tab, setTab] = useState("Upcoming");

  const { data, isLoading, isError } = useBookings(userId, tab);
  const cancelMutation = useCancelBooking(userId, tab);

  if (isLoading) return <h2 style={styles.center}>Loading...</h2>;
  if (isError) return <h2 style={styles.center}>Error loading bookings</h2>;

  const bookings = data || [];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎫 My Bookings</h1>

      {/* TABS */}
      <div style={styles.tabs}>
        {["Upcoming", "Past", "Cancelled"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...styles.tab,
              background: tab === t ? "#6366f1" : "#f3f4f6",
              color: tab === t ? "white" : "#333",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LIST */}
      {bookings.length === 0 ? (
        <p style={styles.center}>No bookings found</p>
      ) : (
        bookings.map((b: any) => (
          <div key={b.id} style={styles.card}>
            <div>
              <h3>{b.eventTitle}</h3>
              <p>📅 {b.eventDate}</p>
              <p>🎟️ {b.ticketType} × {b.quantity}</p>
              <p style={getStatusStyle(b.status)}>
                Status: {b.status}
              </p>
            </div>

            {/* CANCEL BUTTON */}
            {b.status !== "Cancelled" && (
              <button
                onClick={() => cancelMutation.mutate(b.id)}
                disabled={cancelMutation.isPending}
                style={styles.cancelBtn}
              >
                {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles: any = {
  page: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 16,
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  tab: {
    padding: "8px 14px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    marginBottom: 12,
    background: "#fff",
    
  },

  cancelBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },

  center: {
    textAlign: "center",
    marginTop: 30,
  },
};

/* ---------------- STATUS COLORS ---------------- */
function getStatusStyle(status: string) {
  switch (status) {
    case "Upcoming":
      return { color: "#6366f1", fontWeight: 600 };

    case "Past":
      return { color: "#6b7280", fontWeight: 600 };

    case "Cancelled":
      return { color: "#ef4444", fontWeight: 600 };

    default:
      return {};
  }
}