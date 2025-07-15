import styled from "styled-components";
import { useCurrentUser } from "../hooks/CurrentUserContext";
import Button from "./Button";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import StyledModal from "./StyledModal";
import { useState } from "react";
import { MESSAGE } from "../constants/message";

const Topbar = () => {
  const { user, setUser } = useCurrentUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
    try {
      localStorage.clear();
      setUser(undefined);
      toast(MESSAGE.LOGOUT_SUCCESS);
      navigate(ROUTES.EVENT.PUBLIC_EVENTS, { replace: true });
      setShowModal(false);
    } catch (error) {
      console.error("Logout Error::", error);
      toast(MESSAGE.LOGOUT_FAILED, { type: "error" });
      setShowModal(false);
    }
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const buttonText = user ? "Logout" : "Login";
  const buttonAction = user ? handleLogoutClick : handleLogin;

  return (
    <>
      <StyledTopbar>
        {user && <div>Current User: {user.username} </div>}
        <Button type="button" style={{ height: "40px" }} onClick={buttonAction}>
          {buttonText}
        </Button>
      </StyledTopbar>
      <StyledModal showModal={showModal}>
        <h2>Logout</h2>
        <div>Are you sure you want to logout?</div>
        <ButtonContainer>
          <Button type="button" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleLogoutConfirm}>
            Confirm
          </Button>
        </ButtonContainer>
      </StyledModal>
    </>
  );
};

export default Topbar;

const StyledTopbar = styled.div`
  height: 48px;
  box-shadow: 0 4px 6px -6px #222;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-inline: 24px;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: end;
  gap: 12px;
`;
