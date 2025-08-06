import { api } from "./apiHandler";
import { Event } from "@/types/event";

export async function getUserEvents(username: string) {
  const response = await api.get(`/events/${username}`);
  return response.data;
}

export async function createEvent(event: Event) {
  const response = await api.post("/events", event);
  return response.data;
}

export async function editEvent(event: Event, eventId: number | undefined) {
  if (!eventId) {
    throw new Error("Event ID is required");
  }
  const response = await api.patch(`/events/${eventId}`, event);
  return response.data;
}
