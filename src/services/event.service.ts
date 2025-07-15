import type { IEvent, IEventForm } from "../models/event.model";
import {
  transformInEvent,
  transformInEvents,
  transformOutEventPayload,
} from "../transformers/event.transformer";
import { api } from "./base.service";
import { handleError } from "../utils/generic";

export const fetchEvents = async (userId?: string): Promise<IEvent[]> => {
  try {
    const response = await api.get("/events", {
      params: {
        ...(userId && { user_id: userId }),
      },
    });
    const { data } = await response.data;
    return transformInEvents(data);
  } catch (error) {
    throw handleError(error);
  }
};

export const fetchEvent = async (id: string): Promise<IEvent> => {
  try {
    const response = await api.get(`/events/${id}`);
    const { data } = await response.data;
    return transformInEvent(data);
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await api.delete(`/events/${id}`);
    const { data } = await response.data;
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createEvent = async (event: IEventForm) => {
  try {
    const payload = transformOutEventPayload(event);
    const response = await api.post(`/events`, payload);
    const { data } = await response.data;
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateEvent = async (event: IEventForm) => {
  if (!event.id) return;
  try {
    const payload = transformOutEventPayload(event);
    const response = await api.put(`/events/${event.id}`, payload);
    const { data } = await response.data;
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const setRSVP = async (id: string, isAccepted: boolean) => {
  try {
    const response = await api.post(`/events/${id}/rsvp`, {
      is_accepted: isAccepted,
    });
    const { data } = await response.data;
    return data;
  } catch (error) {
    throw handleError(error);
  }
};
