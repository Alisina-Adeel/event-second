import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "./bookingsApi";

export function useCancelBooking(userId?: string, status?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    onMutate: async (bookingId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["bookings", userId, status],
      });

      const previous = queryClient.getQueryData([
        "bookings",
        userId,
        status,
      ]);

      queryClient.setQueryData(
        ["bookings", userId, status],
        (old: any) =>
          old?.map((b: any) =>
            b.id === bookingId
              ? { ...b, status: "Cancelled" }
              : b
          )
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        ["bookings", userId, status],
        context?.previous
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, status],
      });
    },
  });
}