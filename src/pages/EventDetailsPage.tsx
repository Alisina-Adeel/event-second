import { useLoaderData, Await, useNavigate } from "react-router-dom";
import { Suspense } from "react";

export default function EventDetailsPage() {
  const data = useLoaderData() as {
    event: Promise<any>;
    reviews: Promise<any>;
  };

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>🎫 Event Details</h1>

      {/* EVENT */}
      <Suspense fallback={<p>Loading event...</p>}>
        <Await resolve={data.event}>
          {(event) => (
            <div
              style={{
                padding: 20,
                border: "1px solid #eee",
                borderRadius: 12,
              }}
            >
              <h2>{event.title}</h2>
              <p>Category: {event.category}</p>
              <p>Price: ${event.price}</p>

             <button
  onClick={() =>
    navigate(`/book/${event.id}`, {
      state: { price: event.price }   // 👈 PASS PRICE HERE
    })
  }
>
  🎫 Book Now
</button>
            </div>
          )}
        </Await>
      </Suspense>

      {/* REVIEWS */}
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Await resolve={data.reviews}>
          {(reviews) => (
            <div style={{ marginTop: 20 }}>
              <h3>⭐ Reviews</h3>

              {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((r: any) => (
                  <p key={r.id}>⭐ {r.text}</p>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}