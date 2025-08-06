import { useQuery } from "@tanstack/react-query";
import { getUserEvents } from "@/api/event";
import { Event } from "@/types/event";

export function useGetUserEvents(username: string) {
  return useQuery<Event[]>({
    queryKey: ["userEvents", username],
    queryFn: () => getUserEvents(username),
    enabled: !!username,
  });
}
