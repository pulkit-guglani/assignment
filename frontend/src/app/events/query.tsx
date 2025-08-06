import { useQuery } from "@tanstack/react-query";
import { getPublicEvents, getUserEvents } from "@/api/event";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { getUserData } from "@/api/auth";

export function useGetUserEvents(username: string) {
  return useQuery<Event[]>({
    queryKey: ["userEvents", username],
    queryFn: () => getUserEvents(username),
    enabled: !!username,
  });
}
export function useGetPublicEvents() {
  return useQuery<Event[]>({
    queryKey: ["publicEvents"],
    queryFn: () => getPublicEvents(),
  });
}

export function useGetUserData(username: string) {
  return useQuery<User>({
    queryKey: ["userData"],
    queryFn: () => getUserData(),
  });
}
