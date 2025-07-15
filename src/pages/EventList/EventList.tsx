import styled from "styled-components";
import { fetchEvents } from "../../services/event.service";
import { EQueryKeys } from "../../enums/query_keys";
import { useQuery } from "@tanstack/react-query";
import EventCard from "./components/EventCard";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import type { IEvent } from "../../models/event.model";
import { useCurrentUser } from "../../hooks/CurrentUserContext";
import { toast } from "react-toastify";

type Props = {
  isPublic: boolean;
};

const EventList = ({ isPublic }: Props) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const [events, setEvents] = useState<IEvent[]>([]);
  const { data, error } = useQuery({
    queryKey: [EQueryKeys.Events, user?.id],
    queryFn: () => fetchEvents(isPublic ? "" : user?.id),
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) toast(error.message, { type: "error" });
  }, [error]);

  const onDeleteEvent = (id: string) => {
    const filtered = events.filter((e) => e.id !== id);
    setEvents(filtered);
  };

  const onClickCreate = () => {
    navigate(ROUTES.EVENT.EDIT_EVENT);
  };

  return (
    <div>
      <Header>
        <div>
          <h1>{isPublic ? "Public" : "My"} Events</h1>
          <div>
            {isPublic && user && (
              <Link to={`${ROUTES.EVENT.USER_EVENTS}`}>View my events</Link>
            )}
            {!isPublic && (
              <Link to={`${ROUTES.EVENT.PUBLIC_EVENTS}`}>
                View public events
              </Link>
            )}
          </div>
        </div>

        {!isPublic && <Button onClick={onClickCreate}>Create Event</Button>}
      </Header>
      <EventContainer>
        {(events ?? []).map((event) => (
          <EventCard
            key={event.id}
            data={event}
            isPublic={isPublic}
            onDelete={onDeleteEvent}
          />
        ))}
        {events.length === 0 && <div className="no-event">No Events</div>}
      </EventContainer>
    </div>
  );
};

export default EventList;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EventContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-flow: row wrap;
  gap: 12px;
  margin-top: 12px;

  .no-event {
    width: 100%;
    text-align: center;
  }
`;
