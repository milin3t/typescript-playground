import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// props type 정의
interface SidebarButtonsProps {
  toggle: () => void;
}

export const SidebarButtons = ({ toggle }: SidebarButtonsProps) => {
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  return (
    <>
      <ImageButton onClick={toggle}>
        <img src="/icons/sidebar.svg" alt="Sidebar" />
      </ImageButton>
      <ImageButton onClick={handleNewChat}>
        <img src="/icons/newchat.svg" alt="New Chat" />
      </ImageButton>
    </>
  );
};

// 일반 회색 버튼
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  background-color: transparent;
  border: 1px solid #555;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

// 강조용 하얀 버튼
export const PrimaryButton = styled(ActionButton)`
  background-color: white;
  color: black;
  font-weight: bold;
`;

// 반응형에서 텍스트 숨김 처리용
export const ButtonText = styled.span<{ $sidebarOpen?: boolean }>`
  @media (max-width: ${({ $sidebarOpen }) =>
      $sidebarOpen ? "1080px" : "768px"}) {
    display: none;
  }
`;

// ********* Header Buttons
export const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: #ccc;
  }
`;

// 임시 버튼 (temporary chat)
// temporary status button
export const StatusButton = styled.button`
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #555;
  color: white;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const AvatarButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #888;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

/*
import styled from "styled-components";

// ImageButton 먼저 정의
export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

// Sidebar & NewChat 버튼 묶음
export const SidebarButtons = () => {
  return (
    <>
      <ImageButton>
        <img src="/icons/sidebar.svg" alt="Sidebar" />
      </ImageButton>
      <ImageButton>
        <img src="/icons/newchat.svg" alt="New Chat" />
      </ImageButton>
    </>
  );
};

// 일반 회색 버튼
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  background-color: transparent;
  border: 1px solid #555;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

// 강조용 하얀 버튼
export const PrimaryButton = styled(ActionButton)`
  background-color: white;
  color: black;
  font-weight: bold;
`;

// 반응형에서 텍스트 숨김 처리용
export const ButtonText = styled.span<{ $sidebarOpen?: boolean }>`
  @media (max-width: ${({ $sidebarOpen }) =>
      $sidebarOpen ? "1080px" : "768px"}) {
    display: none;
  }
`;

// ********* Header Buttons
export const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: #ccc;
  }
`;

// 임시 버튼 (temporary chat)
export const StatusButton = styled.button`
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #555;
  color: white;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const AvatarButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #888;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;


*/
