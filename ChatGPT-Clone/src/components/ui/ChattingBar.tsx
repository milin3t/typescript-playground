import { useState } from "react";
import styled from "styled-components";
import { ActionButton, PrimaryButton, ButtonText } from "../ui/Button"; // ✅ 버튼 컴포넌트 가져오기

const ChattingBar = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container>
      <Input
        placeholder="Ask anything"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <BottomRow>
        <LeftButtons>
          <ActionButton>+</ActionButton>
          <ActionButton>
            🌎 <ButtonText>Search</ButtonText>
          </ActionButton>
          <ActionButton>
            💡 <ButtonText>Reason</ButtonText>
          </ActionButton>
          <ActionButton>
            🔭 <ButtonText>Deep research</ButtonText>
          </ActionButton>
          <ActionButton>
            🎨 <ButtonText>Create image</ButtonText>
          </ActionButton>
          <ActionButton>...</ActionButton>
        </LeftButtons>

        <RightButtons>
          <ActionButton>🎙️</ActionButton>
          <PrimaryButton>
            {inputValue.trim() === "" ? "📊" : "⬆️"}
          </PrimaryButton>
        </RightButtons>
      </BottomRow>
    </Container>
  );
};

export default ChattingBar;

// 아래는 ChattingBar 내부 레이아웃용 스타일만 남김

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

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 16px;
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

  @media (max-width: 480px) {
    justify-content: center;
    gap: 12px;
  }
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
