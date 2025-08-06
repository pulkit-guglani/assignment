import { Event } from "./event";

export interface User {
  username: string;
  createdEvents: Event[];
  rsvpedEvents: Event[];
}
