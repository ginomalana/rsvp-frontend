import styled from "styled-components";
import CredentialsLogin from "../components/CredentialsLogin";

const LoginPage = () => (
  <LoginContainer>
    <CredentialsLogin />
  </LoginContainer>
);

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;
