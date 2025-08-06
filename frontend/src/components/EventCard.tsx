"use client";

import { Event } from "../types/event";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      if (event?.id) onDelete(event.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    // timeString is in format "HH:mm:ss", convert to "HH:mm AM/PM"
    const [hours, minutes] = timeString.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 text-sm">{event.eventName}</h3>
        <div className="text-xs text-gray-600 space-y-0.5">
          <div>Date: {formatDate(event.date)}</div>
          <div>Time: {formatTime(event.time)}</div>
          <div>Location: {event.location}</div>
          <div>
            RSVPs: {event.rsvpCount} / {event.maxRsvpCount}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(event)}
            className="text-xs flex items-center gap-1 text-gray-600"
          >
            <Image src="/pencil.svg" alt="Edit" width={16} height={16} />
            Edit
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
