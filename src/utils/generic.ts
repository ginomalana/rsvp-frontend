import { isAxiosError, type AxiosError } from "axios";

export const handleError = (err: unknown) => {
  const error = err as Error | AxiosError;
  if (isAxiosError(error)) {
    return error.response?.data?.details;
  }
  return error.message;
};
