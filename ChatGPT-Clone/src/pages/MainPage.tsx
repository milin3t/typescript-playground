import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import ChatPanel from "../components/chat/ChatPanel";

const MainPage = () => {
  return (
    <Wrapper>
      <Sidebar />
      <ChatPanel />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
