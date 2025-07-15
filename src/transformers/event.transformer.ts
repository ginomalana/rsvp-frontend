import { format } from "date-fns";
import type {
  _IEvent,
  _IEventPayload,
  _IEventRSVP,
  IEvent,
  IEventForm,
  IEventRSVP,
} from "../models/event.model";

export const transformInEvents = (data: _IEvent[]): IEvent[] => {
  return data.map((event) => transformInEvent(event));
};

export const transformInEvent = (data: _IEvent): IEvent => {
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    deletedAt: data.deleted_at ? new Date(data.deleted_at) : undefined,
    eventDate: data.event_date
      ? format(new Date(data.event_date), "yyyy-MM-dd'T'HH:mm")
      : "",
    location: data.location,
    description: data.description,
    maxRsvpCount: data.max_rsvp_count,
    rsvpCount: data.rsvp_count,
    isAccepted: !!data.is_accepted,
  };
};

export const transformInEventRSVP = (data: _IEventRSVP): IEventRSVP => {
  return {
    id: data.id,
    eventId: data.event_id,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    deletedAt: data.deleted_at ? new Date(data.deleted_at) : undefined,
  };
};

export const transformOutEventPayload = (data: IEventForm): _IEventPayload => {
  return {
    name: data.name,
    event_date: new Date(data.eventDate).toISOString(),
    location: data.location,
    description: data.description,
    max_rsvp_count: data.maxRsvpCount,
  };
};
