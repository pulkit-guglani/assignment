"use client";

import { loginOrSignupUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export interface LoginResponse {
  token?: string;
  message?: string;
}

// Custom React Query hook for POST /login
export const useLoginSignupMutation = () =>
  useMutation({
    mutationKey: ["login-signup"],
    mutationFn: (username: string) => {
      return loginOrSignupUser(username);
    },
  });
