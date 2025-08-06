"use client";

import { User } from "@/types/user";
import { Event } from "../types/event";

interface PublicEventCardProps {
  event: Event;
  onRSVP: (eventId: number) => void;
  isRSVPLoading?: boolean;
  userData: User | null;
}

export default function PublicEventCard({
  event,
  onRSVP,
  isRSVPLoading,
  userData,
}: PublicEventCardProps) {
  const alreadyRSVPed = userData?.rsvpedEvents.some((e) => e.id === event.id);

  const handleRSVP = () => {
    if (event?.id) {
      onRSVP(event.id);
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
    const [hours, minutes] = timeString.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isEventFull =
    event?.rsvpCount && event?.maxRsvpCount
      ? event.rsvpCount >= event.maxRsvpCount
      : false;

  return (
    <div className="bg-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 text-sm">{event.eventName}</h3>
        <div className="text-xs text-gray-600 space-y-0.5">
          <div>Date: {formatDate(event.date)}</div>
          <div>Time: {formatTime(event.time)}</div>
          <div>Location: {event.location}</div>
          <div>Description: {event.description}</div>
          <div>
            RSVPs: {event.rsvpCount} / {event.maxRsvpCount}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-3">
        <button
          onClick={handleRSVP}
          disabled={isEventFull || isRSVPLoading || alreadyRSVPed}
          className={`px-3 py-1 rounded text-xs transition-colors ${
            isEventFull || alreadyRSVPed
              ? "bg-gray-400 text-white !cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white"
          }`}
        >
          {isRSVPLoading
            ? "RSVPing..."
            : isEventFull
            ? "Full"
            : alreadyRSVPed
            ? "RSVPed"
            : "RSVP"}
        </button>
      </div>
    </div>
  );
}
