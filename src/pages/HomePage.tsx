import type { PropsWithChildren } from "react";
import Topbar from "../components/Topbar";
import styled from "styled-components";

const HomePage = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Topbar />
      <HomePageContainer>{children}</HomePageContainer>
    </>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  padding: 12px 24px;
`;
