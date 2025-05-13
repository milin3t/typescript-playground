// src/components/header/Header.tsx
import styled from "styled-components";
import { ImageButton, StatusButton, AvatarButton } from "../ui/Button";

const Header = () => {
  return (
    <Container>
      <Left>
        <ImageButton>
          <img src="/icons/sidebar.svg" alt="Sidebar" />
        </ImageButton>
        <ImageButton>
          <img src="/icons/newchat.svg" alt="New Chat" />
        </ImageButton>
        <Title>JJapGPT &gt;</Title>
      </Left>

      <Right>
        <StatusButton>Temporary</StatusButton>
        <AvatarButton>👤</AvatarButton>
      </Right>
    </Container>
  );
};

export default Header;

// 레이아웃 전용 스타일
const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 56px;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
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
