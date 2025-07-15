import { FormProvider, useForm } from "react-hook-form";
import type { IEventForm } from "../../models/event.model";
import { EVENT_FORM_DEFAULT } from "../../constants/events";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventFormSchema } from "../../validators/event";
import styled from "styled-components";
import Button from "../../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import EventForm from "./components/EventForm";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  fetchEvent,
  updateEvent,
} from "../../services/event.service";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { EQueryKeys } from "../../enums/query_keys";
import { useCurrentUser } from "../../hooks/CurrentUserContext";

const EventFormPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState<boolean>(false);

  const methods = useForm<IEventForm>({
    defaultValues: EVENT_FORM_DEFAULT,
    mode: "onChange",
    resolver: yupResolver(eventFormSchema),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { isValid, isDirty },
  } = methods;

  const { mutate: fetchEventFn } = useMutation({
    mutationFn: (id: string) => fetchEvent(id),
    onSuccess: (values) => {
      Object.keys(getValues()).forEach((item) => {
        const key = item as keyof IEventForm;
        setValue(key, values[key]);
      });
      trigger();
    },
    onError: (error: string) => {
      toast(error, { type: "error" });
    },
  });

  const { mutate: saveEventFn } = useMutation({
    mutationFn: (data: IEventForm) =>
      data.id ? updateEvent(data) : createEvent(data),
    onSuccess: (_, data) => {
      toast(`Event ${data.id ? "updated" : "created"} successfully`);
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.Events, user?.id],
        exact: true,
      });
      navigate(ROUTES.EVENT.USER_EVENTS);
    },
    onError: (error: string) => {
      toast(error, { type: "error" });
    },
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) fetchEventFn(id);
  }, [fetchEventFn, searchParams]);

  const onSubmit = (values: IEventForm) => {
    if (!isValid) return;
    saveEventFn(values);
  };

  const onClickClose = () => {
    if (isDirty) {
      setShowModal(true);
    } else {
      onClose();
    }
  };

  const onClose = () => {
    navigate(ROUTES.EVENT.USER_EVENTS);
  };

  return (
    <>
      <div>
        <h1>Event Creation</h1>
        <FormProvider {...methods}>
          <form id="event-form" onSubmit={handleSubmit(onSubmit)}>
            <EventForm />
          </form>
        </FormProvider>
        <ButtonContainer>
          <Button type="button" onClick={onClickClose}>
            Cancel
          </Button>
          <Button type="submit" form="event-form">
            Save
          </Button>
        </ButtonContainer>
      </div>
      <Modal isOpen={showModal} style={customStyles}>
        <h2>Discard Changes?</h2>
        <div>Do you want to discard the changes and continue?</div>
        <ButtonContainer>
          <Button type="button" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onClose}>
            Discard
          </Button>
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default EventFormPage;

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: end;
  gap: 12px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
