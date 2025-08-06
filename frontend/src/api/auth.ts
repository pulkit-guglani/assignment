import { api } from "./apiHandler";

export async function loginOrSignupUser(username: string) {
  const response = await api.post(`/users/login-or-signup/${username}`);
  return response.data;
}
