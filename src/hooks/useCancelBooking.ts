import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "../api/bookingsApi";

export function useCancelBooking(userId: string, status?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    // 🔥 optimistic update (instant UI change)
    onMutate: async (bookingId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["bookings", userId, status],
      });

      const previousBookings = queryClient.getQueryData([
        "bookings",
        userId,
        status,
      ]);

      queryClient.setQueryData(
        ["bookings", userId, status],
        (old: any) =>
          old?.map((booking: any) =>
            booking.id === bookingId
              ? { ...booking, status: "Cancelled" }
              : booking
          )
      );

      return { previousBookings };
    },

    // ❌ rollback if error happens
    onError: (_err, _bookingId, context) => {
      queryClient.setQueryData(
        ["bookings", userId, status],
        context?.previousBookings
      );
    },

    // 🔄 always sync with server
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, status],
      });
    },
  });
}