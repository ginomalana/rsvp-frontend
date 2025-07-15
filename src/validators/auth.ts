import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginFormSchema: any = yup.object().shape({
  username: yup.string().required("Username is required."),
});
