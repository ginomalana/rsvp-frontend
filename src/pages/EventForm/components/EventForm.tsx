import { useFormContext } from "react-hook-form";
import type { IEventForm } from "../../../models/event.model";
import styled from "styled-components";

const EventForm = () => {
  const {
    register,
    formState: {
      errors: {
        name: _name,
        eventDate: _eventDate,
        location: _location,
        description: _description,
        maxRsvpCount: _maxRsvpCount,
      },
    },
  } = useFormContext<IEventForm>();

  return (
    <EventFormContainer>
      <div className="form-container">
        <div className="form-item">
          <label>Name:</label>
          <input {...register("name")} />
          <div className="error">{_name && <span>{_name.message}</span>}</div>
        </div>

        <div className="form-item">
          <label>Event Date:</label>
          <input type="datetime-local" {...register("eventDate")} />
          <div className="error">
            {_eventDate && <span>{_eventDate.message}</span>}
          </div>
        </div>

        <div className="form-item">
          <label>Location:</label>
          <input {...register("location")} />
          <div className="error">
            {_location && <span>{_location.message}</span>}
          </div>
        </div>

        <div className="form-item">
          <label>Description:</label>
          <input {...register("description")} />
          <div className="error">
            {_description && <span>{_description.message}</span>}
          </div>
        </div>

        <div className="form-item">
          <label>Max RSVP Count:</label>
          <input {...register("maxRsvpCount")} />
          <div className="error">
            {_maxRsvpCount && <span>{_maxRsvpCount.message}</span>}
          </div>
        </div>
      </div>
    </EventFormContainer>
  );
};

export default EventForm;

const EventFormContainer = styled.div`
  margin-top: 120px;
  display: flex;
  width: 100%;
  justify-content: center;

  .form-container {
    display: grid;
    gap: 12px;
    width: 500px;

    .form-item {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 12px;
      .error {
        height: 14px;
        text-align: end;
        grid-column: 2;
        font-size: 12px;
        color: red;
      }
    }
  }
`;
