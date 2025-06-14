// SideHeader.tsx
import styled from "styled-components";
import { ImageButton } from "../ui/Button";
import { useSidebar } from "../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";

const SideHeader = () => {
  const { toggle } = useSidebar();
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  return (
    <Header>
      <ImageButton onClick={toggle}>
        <img src="/icons/sidebar.svg" alt="Sidebar" />
      </ImageButton>
      <ImageButton onClick={handleNewChat}>
        <img src="/icons/newchat.svg" alt="New Chat" />
      </ImageButton>
    </Header>
  );
};

export default SideHeader;

const Header = styled.div`
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #444;
`;
