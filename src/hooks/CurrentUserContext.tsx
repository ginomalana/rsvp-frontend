/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { IUser } from "../models/user.model";
import { ELocalStorageKeys } from "../enums/localstorage_keys";

type CurrentUserContextState = {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
};

const CurrentUserContext = createContext<CurrentUserContextState>({
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_user) => {},
});

export const CurrentUserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | undefined>(
    localStorage.getItem(ELocalStorageKeys.User)
      ? JSON.parse(localStorage.getItem(ELocalStorageKeys.User) ?? "")
      : undefined
  );

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
