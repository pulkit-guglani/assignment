"use client";

import { loginOrSignupUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginSignupMutation = () =>
  useMutation({
    mutationKey: ["login-signup"],
    mutationFn: (username: string) => {
      return loginOrSignupUser(username);
    },
  });
