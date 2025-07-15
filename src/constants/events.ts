import type { IEventForm } from "../models/event.model";

export const EVENT_FORM_DEFAULT: IEventForm = {
  id: "",
  name: "",
  eventDate: "",
  location: "",
  description: "",
  rsvpCount: 0,
  maxRsvpCount: 0,
};
