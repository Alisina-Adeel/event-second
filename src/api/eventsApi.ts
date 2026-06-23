import { api } from "../services/api";

export type EventInput = {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  date?: string;
  time?: string;
  location?: string;
  tickets?: any[];
};

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const getEventById = async (id: string) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

export const publishEvent = async (data: EventInput) => {
  const res = await api.post("/events", data);
  return res.data;
};