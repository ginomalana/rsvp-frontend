import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eventFormSchema: any = yup.object().shape({
  name: yup.string().required("Name is required."),
  eventDate: yup
    .date()
    .typeError("Event Date is required")
    .required("Event Date is required."),
  location: yup.string().required("Location is required."),
  description: yup.string().required("Description is required."),
  rsvpCount: yup.number(),
  maxRsvpCount: yup
    .number()
    .typeError("RSVP Count must be number")
    .positive("RSVP Count must be at least 1") // Validates against negative values
    .required("RSVP Count is required")
    .max(20, "Max RSVP Count is 20")
    .test({
      test: function (value) {
        const count = this.parent.rsvpCount ?? 0;
        if (value < count) {
          return this.createError({
            message: "Max RSVP is less than the current RSVP",
          });
        }
        return true;
      },
    }),
});
