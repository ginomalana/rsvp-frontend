import type { IEvent } from "../../../models/event.model";
import styled from "styled-components";
import { format } from "date-fns";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteEvent, setRSVP } from "../../../services/event.service";
import { toast } from "react-toastify";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useCurrentUser } from "../../../hooks/CurrentUserContext";
import StyledModal from "../../../components/StyledModal";

type Props = {
  data: IEvent;
  isPublic: boolean;
  onDelete: (id: string) => void;
};

const EventCard = ({ data, isPublic, onDelete }: Props) => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [event, setEvent] = useState<IEvent>(data);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (data) setEvent(data);
  }, [data]);

  const { mutate: deleteEventFn } = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      toast("Event deleted successfully!");
      onDelete(data.id);
    },
    onError: (error: string) => {
      toast(error, { type: "error" });
    },
  });

  const { mutate: setRSVPFn } = useMutation({
    mutationFn: ({ id, isAccepted }: { id: string; isAccepted: boolean }) =>
      setRSVP(id, isAccepted),
    onSuccess: () => {
      const isAccepted = event.isAccepted ?? false;
      setEvent({
        ...event,
        isAccepted: !isAccepted,
        rsvpCount: isAccepted ? event.rsvpCount - 1 : event.rsvpCount + 1,
      });
      toast(isAccepted ? "RSVP removed successfully" : "RSVP'd successfully");
    },
    onError: (error: string) => {
      toast(error, { type: "error" });
    },
  });

  const onClickRSVP = () => {
    if (!user) {
      toast("Please login to RSVP on the event!");
      return;
    }
    const prevState = event.isAccepted ?? false;
    setRSVPFn({ id: event.id, isAccepted: !prevState });
  };

  const onClickEdit = () => {
    navigate({
      pathname: ROUTES.EVENT.EDIT_EVENT,
      search: createSearchParams({ id: event.id }).toString(),
    });
  };

  const onClickDelete = () => {
    deleteEventFn(data.id);
  };

  const isRSVPDisabled =
    !event.isAccepted && event.rsvpCount === event.maxRsvpCount;

  return (
    <>
      <CardContainer>
        <div className="date">
          {format(event.eventDate, "E, MMM dd, yyy - HH:mma")}
        </div>
        <div className="title">{event.name}</div>
        <div className="description">{event.description}</div>
        <div className="location">Location: {event.location}</div>
        <div className="footer">
          {isPublic ? (
            <>
              <div className="rsvp-count">
                RSVP: {event.rsvpCount}/{event.maxRsvpCount}
              </div>
              <Button onClick={onClickRSVP} disabled={isRSVPDisabled}>
                {event.isAccepted ? "RSVP'd" : "RSVP"}
              </Button>
            </>
          ) : (
            <>
              <div className="button-container">
                <Button onClick={onClickEdit}>Edit</Button>
                <Button onClick={() => setShowModal(true)}>Delete</Button>
              </div>
            </>
          )}
        </div>
      </CardContainer>
      <StyledModal showModal={showModal}>
        <h2>Delete Event?</h2>
        <div>Do you want to delete event {event.name}?</div>
        <ButtonContainer>
          <Button type="button" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onClickDelete}>
            Delete
          </Button>
        </ButtonContainer>
      </StyledModal>
    </>
  );
};

export default EventCard;

const CardContainer = styled.div`
  width: 240px;
  text-align: left;
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 24px;
  background: white;

  .date {
    font-size: 12px;
  }

  .title {
    padding-top: 4px;
    font-size: 18px;
  }

  .description {
    font-size: 14px;
    color: #808080;
    margin-bottom: 8px;
  }

  .location {
    font-size: 12px;
  }

  .footer {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    align-items: baseline;

    .rsvp-count {
      font-size: 14px;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: 8px;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: end;
  gap: 12px;
`;
