// src/components/header/Header.tsx
import styled from "styled-components";
import { SidebarButtons, StatusButton, AvatarButton } from "../ui/Button";
import { useSidebar } from "../../contexts/SidebarContext";

const ChatHeader = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <Container>
      <Left>
        {!isOpen && <SidebarButtons toggle={toggle} />} <Title>JJapGPT</Title>
      </Left>
      <Right>
        <StatusButton>Temporary</StatusButton>
        <AvatarButton>👤</AvatarButton>
      </Right>
    </Container>
  );
};

export default ChatHeader;

// 레이아웃 전용 스타일
const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #2c2c2e;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  color: white;
  font-weight: 500;
`;
