import styled from "styled-components";
import ChattingBar from "../components/ui/ChattingBar";
import Header from "../components/layout/Header";

const ChatPage = () => {
  return (
    <>
      <Header />
      <MainPanel>
        <ContentWrapper>
          <TypingText>What can I help with?</TypingText>
          <ChattingBarWrapper>
            <ChattingBar />
          </ChattingBarWrapper>
        </ContentWrapper>
      </MainPanel>
    </>
  );
};

export default ChatPage;

const MainPanel = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 820px;
  padding: 0 24px;

  @media (max-width: 768px) {
    height: 100%;
    justify-content: center;
    padding-bottom: 140px; // 채팅바가 fixed로 내려가기 때문에 공간 확보
  }
`;

const TypingText = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
  overflow: hidden;
  width: 0;
  animation: typing 2.5s steps(25, end) forwards, blink 0.75s step-end infinite;

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 240px;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
`;

const ChattingBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 16px;
    left: 0;
    padding: 0 16px;
    box-sizing: border-box;
  }
`;
