import type { IUser } from "../models/user.model";
import { handleError } from "../utils/generic";
import { api } from "./base.service";

export const loginUser = async (username: string): Promise<IUser> => {
  try {
    const response = await api.post("/auth/login", { username });
    const { data } = response.data;
    return data;
  } catch (error) {
    throw handleError(error);
  }
};
