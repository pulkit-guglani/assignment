"use client";

import { useEffect, useState } from "react";
import { useLoginSignupMutation } from "../app/login/mutation";
import { useRouter } from "next/navigation";

// Basic login component with minimal styling
// Calls POST /login with a JSON body: { username }
export default function LoginBox() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    mutate: loginMutation,
    isPending,
    isSuccess,
  } = useLoginSignupMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    loginMutation(username);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("username", username);
      router.push("/events/my");
    }
  }, [isSuccess]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-semibold">Event Planner</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col space-y-4 items-center"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-2 border border-gray-700 rounded-sm hover:bg-gray-100 disabled:opacity-60"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {isSuccess && (
          <p className="text-green-600 text-sm">Logged in successfully!</p>
        )}
      </form>
    </div>
  );
}
