import { useReducer } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../api/bookingsApi";

/* ---------------- TYPES ---------------- */
type State = {
  step: number;
  ticketType: string;
  quantity: number;
  name: string;
  email: string;
};

type Action =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_TICKET"; payload: string }
  | { type: "SET_QUANTITY"; payload: number }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string };

/* ---------------- STATE ---------------- */
const initialState: State = {
  step: 1,
  ticketType: "",
  quantity: 1,
  name: "",
  email: "",
};

/* ---------------- REDUCER ---------------- */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_TICKET":
      return { ...state, ticketType: action.payload };
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

/* ---------------- MAIN ---------------- */
export default function BookPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const price = location.state?.price ?? 100;

  const [state, dispatch] = useReducer(reducer, initialState);

  const total = state.quantity * price;

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/my-bookings");
    },
  });

const handleBooking = () => {
  mutation.mutate({
    eventId,
    eventTitle: "Event Booking",
    eventDate: new Date().toISOString().split("T")[0], // ✅ FIX
    ticketType: state.ticketType,
    quantity: state.quantity,
    name: state.name,
    email: state.email,
    totalAmount: total,
    status: "Upcoming",
  });
};

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎫 Booking Flow</h1>
        <p style={styles.subtitle}>Event ID: {eventId}</p>

        <h3 style={styles.stepTitle}>Step {state.step} / 3</h3>

        {state.step === 1 && (
          <Step1 state={state} dispatch={dispatch} total={total} />
        )}

        {state.step === 2 && (
          <Step2 state={state} dispatch={dispatch} />
        )}

        {state.step === 3 && (
          <Step3
            state={state}
            dispatch={dispatch}
            total={total}
            onConfirm={handleBooking}
            loading={mutation.isPending}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- STEP 1 ---------------- */
function Step1({ state, dispatch, total }: any) {
  return (
    <div style={styles.section}>
      <h2>Select Ticket</h2>

      <select
        style={styles.input}
        value={state.ticketType}
        onChange={(e) =>
          dispatch({ type: "SET_TICKET", payload: e.target.value })
        }
      >
        <option value="">Select</option>
        <option value="General">General</option>
        <option value="VIP">VIP</option>
      </select>

      <input
        style={styles.input}
        type="number"
        min={1}
        value={state.quantity}
        onChange={(e) =>
          dispatch({ type: "SET_QUANTITY", payload: Number(e.target.value) })
        }
      />

      <p style={styles.total}>
        Total: <b>${total}</b>
      </p>

      <button style={styles.primaryBtn} onClick={() => dispatch({ type: "NEXT_STEP" })}>
        Continue →
      </button>
    </div>
  );
}

/* ---------------- STEP 2 ---------------- */
function Step2({ state, dispatch }: any) {
  return (
    <div style={styles.section}>
      <h2>Attendee Info</h2>

      <input
        style={styles.input}
        placeholder="Name"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />

      <input
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChange={(e) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
      />

      <div style={styles.row}>
        <button style={styles.secondaryBtn} onClick={() => dispatch({ type: "PREV_STEP" })}>
          Back
        </button>

        <button style={styles.primaryBtn} onClick={() => dispatch({ type: "NEXT_STEP" })}>
          Continue →
        </button>
      </div>
    </div>
  );
}

/* ---------------- STEP 3 ---------------- */
function Step3({ state, dispatch, total, onConfirm, loading }: any) {
  return (
    <div style={styles.section}>
      <h2>Confirm Booking</h2>

      <div style={styles.preview}>
        <p><b>Ticket:</b> {state.ticketType}</p>
        <p><b>Quantity:</b> {state.quantity}</p>
        <p><b>Name:</b> {state.name}</p>
        <p><b>Email:</b> {state.email}</p>
        <p><b>Total:</b> ${total}</p>
      </div>

      <div style={styles.row}>
        <button style={styles.secondaryBtn} onClick={() => dispatch({ type: "PREV_STEP" })}>
          ← Back
        </button>

        <button
          style={{
            ...styles.primaryBtn,
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles: any = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
    padding: 16,
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },

  title: { textAlign: "center", color: "#111827" },
  subtitle: { textAlign: "center", opacity: 0.6, color: "#111827" },
  stepTitle: { textAlign: "center", color: "#111827" },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    color: "#111827",
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    width: "100%",
  },

  preview: {
    background: "#eef2ff",
    padding: 14,
    borderRadius: 10,
  },

  total: {
    fontSize: 16,
    fontWeight: 700,
  },

  row: {
    display: "flex",
    gap: 10,
    justifyContent: "space-between",
    
  },

  primaryBtn: {
    flex: 1,
    padding: "10px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },

  secondaryBtn: {
    flex: 1,
    padding: "10px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};