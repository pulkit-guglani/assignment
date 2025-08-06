"use client";

import { useState, useEffect } from "react";
import { Event } from "../types/event";

interface EditEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  event?: Event | null;
  isLoading: boolean;
}

export default function EditEventDialog({
  isOpen,
  onClose,
  onSave,
  event,
  isLoading,
}: EditEventDialogProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    maxRsvpCount: "",
  });

  const [currentUser, setCurrentUser] = useState<string>("Username");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  useEffect(() => {
    if (event) {
      const formatDateForInput = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const formatTimeForInput = (timeString: string) => {
        if (!timeString) return "";
        return timeString.substring(0, 5);
      };

      setFormData({
        eventName: event.eventName || "",
        date: formatDateForInput(event.date),
        time: formatTimeForInput(event.time),
        location: event.location || "",
        description: event.description || "",
        maxRsvpCount: event.maxRsvpCount?.toString() || "",
      });
    } else {
      setFormData({
        eventName: "",
        date: "",
        time: "",
        location: "",
        description: "",
        maxRsvpCount: "",
      });
    }
  }, [event, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.eventName.trim()) {
      alert("Event name is required");
      return;
    }
    if (!formData.date) {
      alert("Date is required");
      return;
    }
    if (!formData.time) {
      alert("Time is required");
      return;
    }
    if (!formData.location.trim()) {
      alert("Location is required");
      return;
    }
    if (!formData.maxRsvpCount || isNaN(Number(formData.maxRsvpCount))) {
      alert("Max RSVPs must be a valid number");
      return;
    }

    const formatDateForAPI = (dateString: string) => {
      return `${dateString}T00:00:00`;
    };

    const formatTimeForAPI = (timeString: string) => {
      return `${timeString}:00`;
    };

    const eventData: Event = {
      eventName: formData.eventName.trim(),
      date: formatDateForAPI(formData.date),
      time: formatTimeForAPI(formData.time),
      location: formData.location.trim(),
      description: formData.description.trim(),
      maxRsvpCount: parseInt(formData.maxRsvpCount),
      username: currentUser,
    };

    if (event?.id) {
      eventData.id = event.id;
    }

    onSave(eventData);
  };

  const handleCancel = () => {
    setFormData({
      eventName: "",
      date: "",
      time: "",
      location: "",
      description: "",
      maxRsvpCount: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-gray-800 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {event ? "Edit Event" : "Event Creation / Edit Form"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Logged in as: {currentUser}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
              placeholder="Enter event description (optional)"
            />
          </div>

          <div>
            <label
              htmlFor="maxRsvpCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max RSVPs
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-bold">
                #
              </span>
              <input
                type="number"
                id="maxRsvpCount"
                name="maxRsvpCount"
                value={formData.maxRsvpCount}
                onChange={handleInputChange}
                min="1"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter maximum number of RSVPs"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Event"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
