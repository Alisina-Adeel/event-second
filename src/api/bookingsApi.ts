import axios from "axios";

const BASE_URL = "http://localhost:3001/bookings";

// GET BOOKINGS
export const getBookings = async (userId?: string, status?: string) => {
  let url = BASE_URL;

  const params: any = {};

  if (userId) params.userId = userId;
  if (status) params.status = status;

  const res = await axios.get(url, { params });

  return res.data;
};

// CANCEL BOOKING
export const cancelBooking = async (bookingId: string) => {
  const res = await axios.patch(`${BASE_URL}/${bookingId}`, {
    status: "Cancelled",
  });

  return res.data;
};

export const createBooking = async (booking: any) => {
  const res = await axios.post(BASE_URL, booking);
  return res.data;
};