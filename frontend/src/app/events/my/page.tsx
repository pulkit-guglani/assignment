"use client";

import { useState, useEffect } from "react";
import EventCard from "../../../components/EventCard";
import EditEventDialog from "../../../components/EditEventDialog";
import { Event } from "../../../types/event";

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>("Username");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: 1,
        eventName: "Event Name",
        date: "2024-01-15",
        time: "10:00 AM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
      {
        id: 2,
        eventName: "Event Name",
        date: "2024-01-16",
        time: "2:00 PM",
        location: "Location",
        maxRsvpCount: 100,
        rsvpCount: 1,
        username: "Username",
      },
      {
        id: 3,
        eventName: "Event Name",
        date: "2024-01-17",
        time: "6:00 PM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
      {
        id: 4,
        eventName: "Event Name",
        date: "2024-01-18",
        time: "9:00 AM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
      {
        id: 5,
        eventName: "Event Name",
        date: "2024-01-19",
        time: "3:00 PM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
      {
        id: 6,
        eventName: "Event Name",
        date: "2024-01-20",
        time: "7:00 PM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
      {
        id: 7,
        eventName: "Event Name",
        date: "2024-01-21",
        time: "11:00 AM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
      {
        id: 8,
        eventName: "Event Name",
        date: "2024-01-22",
        time: "4:00 PM",
        location: "Location",
        maxRsvpCount: 200,
        rsvpCount: 2,
        username: "Username",
      },
    ];

    // Simulate API loading
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  const handleCreateNewEvent = () => {
    setEditingEvent(null); // Ensure we're creating a new event
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = async (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
    console.log("Delete event:", eventId);
  };

  const handleLinkToPublicEvents = () => {
    console.log("Link to public events clicked");
  };

  const handleSaveEvent = (eventData: Partial<Event>) => {
    if (editingEvent) {
      const updatedEvent = { ...editingEvent, ...eventData };
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEvent.id ? updatedEvent : event
        )
      );
      console.log("Event updated:", updatedEvent);
    } else {
      const newEvent: Event = {
        id: Date.now(),
        rsvpCount: 0,
        ...eventData,
      } as Event;
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
      console.log("New event created:", newEvent);
    }
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
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

          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events found. Create your first event!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {events.map((event) => (
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
            className=" hover:text-blue-800 underline cursor-pointer"
          >
            Link to Public Events Page
          </button>
        </div>
      </main>

      {/* Edit Event Dialog */}
      <EditEventDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveEvent}
        event={editingEvent}
      />
    </div>
  );
}
