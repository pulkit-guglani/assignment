export interface Event {
  id: number;
  eventName: string;
  date: string;
  time: string;
  location: string;
  maxRsvpCount: number;
  rsvpCount: number;
  description?: string;
  username: string;
}
