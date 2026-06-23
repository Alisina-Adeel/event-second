import { api } from "../services/api";

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const getEventReviews = async (id: string) => {
  const res = await api.get(`/events/${id}/reviews`);
  return res.data || [];
};

export const publishEvent = async (eventData: any) => {
  const res = await api.post("/events", eventData);
  return res.data;
};