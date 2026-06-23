import { useState, useDeferredValue } from "react";
import { useEvents } from "../components/hooks/useEvents";
import EventCard from "../components/EventCard";
import {  useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function EventsPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { data: events = [], isLoading, isError } = useEvents();

  const [search] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  function toggleFavorite(id: string) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  }

  const getPrice = (event: any) =>
    event.price ?? event.tickets?.[0]?.price ?? 0;

  const filtered = events.filter((event: any) => {
    const matchesSearch = (event.title ?? "")
      .toLowerCase()
      .includes(deferredSearch.toLowerCase());

    const matchesCategory =
      category === "All" ||
      (event.category && event.category === category);

    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered];

  if (sortBy === "priceLow") {
    sorted.sort((a, b) => getPrice(a) - getPrice(b));
  }

  if (sortBy === "priceHigh") {
    sorted.sort((a, b) => getPrice(b) - getPrice(a));
  }

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error loading events</h2>;

  const safeTheme = theme ?? "light";
const styles = getStyles(safeTheme);

return (
  <div style={styles.page}>
    <div style={styles.header}>
      <h1>🎟 Events</h1>

      <div style={styles.headerRight}>
        <button
          onClick={() => navigate("/my-bookings")}
          style={styles.bookingsBtn}
        >
          🎫 My Bookings
        </button>

        <button onClick={toggleTheme} style={styles.themeBtn}>
          {safeTheme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>

    {/* FILTER ROW (YOUR CODE FIXED) */}
    <div style={styles.row}>
      <select
        style={styles.input}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Technology">Technology</option>
        <option value="Music">Music</option>
        <option value="Business">Business</option>
      </select>

      <select
        style={styles.input}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="priceLow">Price Low → High</option>
        <option value="priceHigh">Price High → Low</option>
      </select>
    </div>

      {/* GRID */}
      <div style={styles.grid}>
        {sorted.map((event: any) => (
          <EventCard
            key={event.id}
            event={event}
            isFavorite={favorites.includes(event.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;

/* ---------------- STYLES ---------------- */
function getStyles(theme: "light" | "dark") {
  const isDark = theme === "dark";

  return {
    page: {
      minHeight: "100vh",
      padding: 20,
      background: isDark ? "#0f172a" : "#f8fafc",
      color: isDark ? "#f1f5f9" : "#111",
      transition: "0.3s",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      flexWrap: "wrap",
      gap: 10,
    },

    headerRight: {
      display: "flex",
      gap: 10,
      alignItems: "center",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: 20,
      marginTop: 20,
    },

    row: {
      display: "flex",
      gap: 10,
      marginTop: 10,
      marginBottom: 10,
      flexWrap: "wrap",
    },

    input: {
      padding: 10,
      borderRadius: 8,
      border: isDark ? "1px solid #334155" : "1px solid #ddd",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
      flex: 1,
    },

    primaryBtn: {
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: "#6366f1",
      color: "white",
      cursor: "pointer",
      marginBottom: 10,
    },

    themeBtn: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid gray",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
      cursor: "pointer",
    },

    bookingsBtn: {
      padding: "8px 14px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      background: "linear-gradient(135deg,#6366f1,#4f46e5)",
      color: "white",
      boxShadow: "0 6px 18px rgba(99,102,241,0.35)",
      transition: "0.2s",
    },
  };
}