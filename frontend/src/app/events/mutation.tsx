import { createEvent, deleteEvent, editEvent } from "@/api/event";
import { useMutation } from "@tanstack/react-query";
import { Event } from "@/types/event";

export const useCreateEventMutation = () =>
  useMutation({
    mutationKey: ["create-event"],
    mutationFn: (event: Event) => {
      return createEvent(event);
    },
  });
export const useEditEventMutation = () =>
  useMutation({
    mutationKey: ["edit-event"],
    mutationFn: (event: Event) => {
      return editEvent(event, event.id);
    },
  });

export const useDeleteEventMutation = () =>
  useMutation({
    mutationKey: ["delete-event"],
    mutationFn: (eventId: number | undefined) => {
      if (!eventId) {
        throw new Error("Event ID is required");
      }
      return deleteEvent(eventId);
    },
  });
