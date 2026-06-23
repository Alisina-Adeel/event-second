import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import {
  nextStep,
  prevStep,
  updateField,

  resetForm,
} from "../store/createEventSlice";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishEvent } from "../api/eventsApi";
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.createEvent);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: publishEvent,
    onSuccess: (newEvent) => {
      queryClient.setQueryData(["events"], (old: any) =>
        old ? [newEvent, ...old] : [newEvent]
      );

      dispatch(resetForm());
      navigate("/events");
    },
  });

  const handlePublish = () => {
    const { step,  ...cleanEvent } = state;
    mutation.mutate(cleanEvent);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>🎉 Create Event</h1>
        <p style={{ opacity: 0.6 }}>Build your event in 3 simple steps</p>
      </div>

      {/* PROGRESS BAR */}
      <div style={styles.progressWrapper}>
        <div style={{ ...styles.progress, width: `${(state.step / 3) * 100}%` }} />
      </div>

      {/* CARD */}
      <div style={styles.card}>
       <h3 style={{
  color: "#6366f1",
  fontWeight: 600,
  marginTop: 10
}}>
  Step {state.step} / 3
</h3>

        {/* STEP 1 */}
        {state.step === 1 && (
          <div style={styles.section}>
            <input
              style={styles.input}
              placeholder="Event Title"
              value={state.title}
              onChange={(e) =>
                dispatch(updateField({ field: "title", value: e.target.value }))
              }
            />

            <textarea
              style={styles.textarea}
              placeholder="Event Description"
              value={state.description}
              onChange={(e) =>
                dispatch(updateField({
                  field: "description",
                  value: e.target.value,
                }))
              }
            />

            <button style={styles.primaryBtn} onClick={() => dispatch(nextStep())}>
              Next →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {state.step === 2 && (
          <div style={styles.section}>
            <input
              style={styles.input}
              placeholder="Location"
              value={state.location}
              onChange={(e) =>
                dispatch(updateField({ field: "location", value: e.target.value }))
              }
            />

           

            <div style={styles.row}>
              <button style={styles.secondaryBtn} onClick={() => dispatch(prevStep())}>
                Back
              </button>

              <button style={styles.primaryBtn} onClick={() => dispatch(nextStep())}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {state.step === 3 && (
  <div style={styles.section}>
    <h2 style={{
  fontSize: "18px",
  fontWeight: 700,
  color: "#111827",
  marginBottom: 10
}}>
  Preview
</h2>

   <div style={styles.previewBox}>
  <div style={styles.previewHeader}>
    <h3 style={styles.previewTitle}>
      {state.title || "Untitled Event"}
    </h3>

    
  </div>

  <p style={styles.previewText}>
    {state.description || "No description provided yet..."}
  </p>

  <div style={styles.previewFooter}>
    <span style={styles.location}>
      📍 {state.location || "No location set"}
    </span>
  </div>
</div>
       
    {/* BUTTONS ROW */}
    <div style={styles.row}>
      <button
        style={styles.secondaryBtn}
        onClick={() => dispatch(prevStep())}
      >
        ← Back
      </button>

      <button
        style={{
          ...styles.primaryBtn,
          opacity: mutation.isPending ? 0.6 : 1,
        }}
        onClick={handlePublish}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Publishing..." : "🚀 Publish Event"}
      </button>
    </div>

    {mutation.isError && (
      <p style={{ color: "red", marginTop: 10 }}>
        Failed to publish event
      </p>
    )}
  </div>
)}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles: any = {
  page: {
    maxWidth: 700,
    margin: "40px auto",
    fontFamily: "Arial",
  },

  header: {
    marginBottom: 20,
  },

  progressWrapper: {
    height: 8,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  progress: {
    height: "100%",
    background: "linear-gradient(90deg,#6366f1,#22c55e)",
    transition: "0.3s",
  },
  row: {
  display: "flex",
  gap: 12, // 👈 adds space between buttons
  marginTop: 10,
},

  card: {
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    background: "#fff",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    minHeight: 100,
  },

  
  previewBox: {
  padding: 18,
  borderRadius: 14,
  background: "linear-gradient(145deg, #ffffff, #f8fafc)",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  marginTop: 10,
},

previewHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

previewTitle: {
  margin: 0,
  fontSize: "18px",
  fontWeight: 700,
  color: "#111827",
},

badge: {
  fontSize: "12px",
  padding: "4px 10px",
  borderRadius: 999,
  background: "#6366f1",
  color: "white",
  fontWeight: 600,
},

previewText: {
  fontSize: "14px",
  color: "#4b5563",
  lineHeight: 1.5,
  marginBottom: 12,
},

previewFooter: {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  color: "#6b7280",
},

location: {
  fontWeight: 500,
},

  
};