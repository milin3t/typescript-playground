import { useState } from "react";
import styled from "styled-components";
import { ActionButton, PrimaryButton, ButtonText } from "../ui/Button";
import { useSidebar } from "../../contexts/SidebarContext";

type ChattingBarProps = {
  onSend: (text: string) => void;
};

const ChattingBar = ({ onSend }: ChattingBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const { isOpen } = useSidebar();

  const handleSend = () => {
    onSend(inputValue);
    setInputValue("");
  };

  return (
    <Container>
      <Input
        placeholder="Ask anything"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <BottomRow>
        <LeftButtons>
          <ActionButton>+</ActionButton>
          <ActionButton>
            🌎 <ButtonText $sidebarOpen={isOpen}>Search</ButtonText>
          </ActionButton>
          <ActionButton>
            💡 <ButtonText $sidebarOpen={isOpen}>Reason</ButtonText>
          </ActionButton>
          <ActionButton>
            🔭 <ButtonText $sidebarOpen={isOpen}>Deep research</ButtonText>
          </ActionButton>
          <ActionButton>
            🎨 <ButtonText $sidebarOpen={isOpen}>Create image</ButtonText>
          </ActionButton>
          <ActionButton>...</ActionButton>
        </LeftButtons>

        <RightButtons>
          <ActionButton>🎙️</ActionButton>
          <PrimaryButton onClick={handleSend}>
            {inputValue === "" ? "📊" : "⬆️"}
          </PrimaryButton>
        </RightButtons>
      </BottomRow>
    </Container>
  );
};

export default ChattingBar;

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2b2b2e;
  padding: 20px 24px;
  border-radius: 40px;
  border: 1px solid #444;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px;
    border-radius: 24px;
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 8px 0;
  outline: none;
  width: 100%;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
