import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/bookingsApi";

export function useBookings(userId: string, status?: string) {
  return useQuery({
    queryKey: ["bookings", userId, status],

    queryFn: () => getBookings(userId, status),

    // 🔥 important performance settings
    staleTime: 1000 * 60 * 2, // 2 min fresh
    gcTime: 1000 * 60 * 10,   // 10 min cache

    enabled: !!userId // conditional query
  });
}