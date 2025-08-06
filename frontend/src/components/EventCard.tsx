"use client";

import { useState } from "react";
import { Event } from "../types/event";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setIsDeleting(true);
      try {
        await onDelete(event.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 text-sm">{event.eventName}</h3>
        <div className="text-xs text-gray-600 space-y-0.5">
          <div>Date</div>
          <div>Time</div>
          <div>Location</div>
          <div>RSVPs: {event.rsvpCount} / T Y Max</div>
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
          disabled={isDeleting}
          className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs transition-colors"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
