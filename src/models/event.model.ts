export type _IEvent = {
  id: string;
  user_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  event_date: string;
  location: string;
  description: string;
  max_rsvp_count: number;
  rsvp_count: number;
  is_accepted?: boolean
};

export type _IEventPayload = Omit<
  _IEvent,
  "id" | "user_id" | "created_at" | "updated_at" | "deleted_at" | "rsvp_count"
> ;

export type IEvent = {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  eventDate: string;
  location: string;
  description: string;
  maxRsvpCount: number;
  rsvpCount: number;
  isAccepted?: boolean;
};

export type IEventForm = Omit<
  IEvent,
  "id" | "userId" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

export type _IEventRSVP = {
  id: string;
  event_id: string;
  user_id: string;
  created_at: Date;
  deleted_at?: Date;
};

export type IEventRSVP = {
  id: string;
  eventId: string;
  userId: string;
  createdAt: Date;
  deletedAt?: Date;
};
