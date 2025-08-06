import { api } from "./apiHandler";

export async function loginOrSignupUser(username: string) {
  const response = await api.post(`/users/login-or-signup/${username}`);
  return response.data;
}
export async function getUserData() {
  const username = localStorage.getItem("username");
  console.log("username", username);
  if (!username) {
    throw new Error("Username not found");
  }
  const response = await api.get(`/users/${username}`);
  return response.data;
}
