import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "../api/bookingsApi";

export function useCancelBooking(userId: string, status?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    // 🔥 optimistic update
    onMutate: async (bookingId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["bookings", userId, status]
      });

      const prev = queryClient.getQueryData([
        "bookings",
        userId,
        status
      ]);

      queryClient.setQueryData(
        ["bookings", userId, status],
        (old: any) =>
          old?.map((b: any) =>
            b.id === bookingId
              ? { ...b, status: "cancelled" }
              : b
          )
      );

      return { prev };
    },

    // rollback on error
    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        ["bookings", userId, status],
        context?.prev
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, status]
      });
    }
  });
}