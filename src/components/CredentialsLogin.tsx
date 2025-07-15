import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { ROUTES } from "../constants/routes";
import { toast } from "react-toastify";
import Button from "./Button";
import styled from "styled-components";
import { useCurrentUser } from "../hooks/CurrentUserContext";
import { ELocalStorageKeys } from "../enums/localstorage_keys";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_FORM_DEFAULT } from "../constants/auth";
import type { IUser, IUserForm } from "../models/user.model";
import { MESSAGE } from "../constants/message";
import { loginFormSchema } from "../validators/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const CredentialsLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: {
      errors: { username: _username },
    },
  } = useForm<IUserForm>({
    defaultValues: LOGIN_FORM_DEFAULT,
    resolver: yupResolver(loginFormSchema),
  });

  const { mutate: loginFn } = useMutation({
    mutationFn: (username: string) => loginUser(username),
    onSuccess: (user: IUser) => handleLoginSuccess(user),
    onError: (error: string) => {
      toast(error, { type: "error" });
    },
  });

  const handleLoginSuccess = (user: IUser) => {
    try {
      localStorage.setItem(ELocalStorageKeys.User, JSON.stringify(user));
      toast("Login successful");
      setUser(user);
      navigate(ROUTES.EVENT.USER_EVENTS);
    } catch (error) {
      console.error("Failed to store user data: ", error);
      toast(MESSAGE.LOGIN_FAILED, { type: "error" });
    }
  };

  const submitForm = async ({ username }: IUserForm) => {
    loginFn(username);
  };

  return (
    <LoginContainer>
      <h1>Event Planner</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="input-container">
          <div className="username-input">
            <input {...register("username")} />
            <div className="error"></div>
          </div>
          {_username && <div className="error">{_username.message}</div>}
        </div>

        <div className="button-container">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </LoginContainer>
  );
};

export default CredentialsLogin;

const LoginContainer = styled.div`
  display: grid;
  gap: 12px;
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 500px;
  justify-content: center;

  .input-container {
    .username-input {
      width: 100%;
      border: 2px solid #f0f0f0;
      input {
        width: 100%;
        border: none;

        &:focus {
          outline: none;
        }
      }
    }

    .error {
      text-align: end;
      font-size: 12px;
      color: red;
      width: 100%;
    }
  }

  .button-container {
    margin-top: 24px;
    display: flex;
    justify-content: end;
  }
`;
