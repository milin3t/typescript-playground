import styled from "styled-components";
import SideHeader from "./SideHeader";
import GPTPlugins from "./GPTPlugins";
import ChatLogs from "./ChatLogs";
import SideFooter from "./SideFooter";
import { useSidebar } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      {isOpen && <Overlay $isOpen={isOpen} onClick={toggle} />}
      <Wrapper $isOpen={isOpen}>
        <SideHeader />

        <ScrollArea>
          <GPTPlugins />
          <ChatLogsContainer>
            <ChatLogs />
          </ChatLogsContainer>
        </ScrollArea>

        <SideFooter />
      </Wrapper>
    </>
  );
};

export default Sidebar;

const Wrapper = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background-color: #1f1f1f;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 100;

  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 검정
    z-index: 99;
  }
`;
const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ChatLogsContainer = styled.div`
  margin-top: 20px; // Explore 밑 여백
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
