import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/bookingsApi";

export function useBookings(userId?: string, status?: string) {
  return useQuery({
    queryKey: ["bookings", userId, status],

    queryFn: () => getBookings(userId, status),

    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,

    enabled: !!userId, // ONLY runs if userId exists
  });
}