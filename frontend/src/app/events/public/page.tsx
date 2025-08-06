"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PublicEventCard from "../../../components/PublicEventCard";
import { useGetPublicEvents, useGetUserData } from "../query";
import { useRsvpToEventMutation } from "../mutation";
import { useQueryClient } from "@tanstack/react-query";

export default function PublicEventsPage() {
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userData } = useGetUserData(currentUser || "");

  const { data: publicEvents, isLoading: isLoadingPublicEvents } =
    useGetPublicEvents();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginRedirect = () => {
    router.push("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setCurrentUser(null);
    setIsLoggedIn(false);
    queryClient.invalidateQueries({ queryKey: ["userData"] });
    queryClient.setQueryData(["userData"], {
      username: "",
      createdEvents: [],
      rsvpedEvents: [],
    });
  };

  if (isLoadingPublicEvents) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Public Events</h1>
        {!isLoggedIn && (
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Log In
          </button>
        )}
        {isLoggedIn && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs transition-colors"
            >
              Log Out
            </button>

            <div className="text-sm text-gray-600">
              Logged in as: {currentUser}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Public Events Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Public Events
          </h1>
          <p className="text-gray-600 mb-6">
            {isLoggedIn
              ? "Browse and RSVP to public events"
              : "Browse public events (log in to RSVP)"}
          </p>
        </div>

        {/* Events Grid */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Available Events
          </h2>

          {publicEvents?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No public events available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {publicEvents?.map((event) => (
                <PublicEventCard
                  key={event.id}
                  event={event}
                  userData={userData || null}
                />
              ))}
            </div>
          )}
        </div>

        {/* Navigation back to My Events if logged in */}
        {isLoggedIn && (
          <div className="text-center mt-8">
            <button
              onClick={() => router.push("/events/my")}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              View My Events
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
