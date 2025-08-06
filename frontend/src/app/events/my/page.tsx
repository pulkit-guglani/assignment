"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventCard from "../../../components/EventCard";
import EditEventDialog from "../../../components/EditEventDialog";
import { Event } from "../../../types/event";
import { useGetUserEvents } from "../query";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useEditEventMutation,
} from "../mutation";
import { useQueryClient } from "@tanstack/react-query";

export default function MyEventsPage() {
  const [currentUser, setCurrentUser] = useState<string>("Username");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventEditMode, setEventEditMode] = useState<"create" | "edit">(
    "create"
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userEvents, isLoading: isLoadingUserEvents } =
    useGetUserEvents(currentUser);
  const {
    mutate: createEvent,
    isPending: isCreatingEvent,
    isSuccess: isEventCreated,
  } = useCreateEventMutation();
  const {
    mutate: editEvent,
    isPending: isEditingEvent,
    isSuccess: isEventEdited,
  } = useEditEventMutation();
  const {
    mutate: deleteEvent,
    isPending: isDeletingEvent,
    isSuccess: isEventDeleted,
  } = useDeleteEventMutation();
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  const resetEventForm = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
    queryClient.invalidateQueries({ queryKey: ["userEvents"] });
  };

  useEffect(() => {
    if (isEventCreated) {
      resetEventForm();
    }
  }, [isEventCreated]);

  useEffect(() => {
    if (isEventEdited) {
      resetEventForm();
    }
  }, [isEventEdited]);

  useEffect(() => {
    if (isEventDeleted) {
      resetEventForm();
    }
  }, [isEventDeleted]);

  const handleCreateNewEvent = () => {
    setEventEditMode("create");
    setEditingEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEventEditMode("edit");
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = async (eventId: number) => {
    deleteEvent(eventId);
  };

  const handleLinkToPublicEvents = () => {
    router.push("/events/public");
  };

  const handleSaveEvent = (eventData: Event) => {
    if (eventEditMode === "edit") {
      editEvent(eventData);
    } else {
      createEvent(eventData);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  if (isLoadingUserEvents) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Events Page</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Event Planner Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Event Planner
          </h1>
          <p className="text-gray-600 mb-6">Logged in as: {currentUser}</p>
          <button
            onClick={handleCreateNewEvent}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            Create New Event
          </button>
        </div>

        {/* My Events Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            My Events
          </h2>

          {userEvents?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events found. Create your first event!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userEvents?.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleLinkToPublicEvents}
            className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
          >
            View Public Events
          </button>
        </div>
      </main>

      <EditEventDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveEvent}
        event={editingEvent}
        isLoading={isCreatingEvent || isEditingEvent}
      />
    </div>
  );
}
