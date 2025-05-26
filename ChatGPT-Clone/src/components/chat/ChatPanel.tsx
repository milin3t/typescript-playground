import styled from "styled-components";
import { useState } from "react";
import ChatMessages from "./ChatMessages"; // assume you will implement this
import ChattingBar from "./ChattingBar";
import ChatHeader from "./ChatHeader";
import { useSidebar } from "../../contexts/SidebarContext";

type MessageType = {
  sender: "user" | "ai";
  text: string;
};

const ChatPanel = () => {
  const { isOpen } = useSidebar();
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `삐빅 나는 깡통이다` },
      ]);
    }, 800);
  };

  return (
    <Wrapper $isOpen={isOpen}>
      <ChatHeader />
      <MainPanel>
        <ContentWrapper $hasMessages={messages.length > 0}>
          {messages.length === 0 ? (
            <>
              <TypingText>What can I help with?</TypingText>
            </>
          ) : (
            <ChatMessages messages={messages} />
          )}
          <ChattingBarWrapper $hasMessages={messages.length > 0}>
            <ChattingBar onSend={handleUserMessage} />
          </ChattingBarWrapper>
        </ContentWrapper>
      </MainPanel>
    </Wrapper>
  );
};

export default ChatPanel;

const Wrapper = styled.div<{ $isOpen: boolean }>`
  flex: 1;
  height: 100vh;
  position: relative;
  background-color: #2c2c2e;
  transition: margin-left 0.3s ease;

  // 사이드바 열렸을 때만 margin-left 적용 (데스크탑에서만)
  margin-left: ${({ $isOpen }) => ($isOpen ? "260px" : "0")};

  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const MainPanel = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div<{ $hasMessages: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 820px;
  padding: 0 24px;
  height: 100%;
  position: relative;

  ${({ $hasMessages }) =>
    $hasMessages
      ? `
      justify-content: flex-start;
      padding-top: 24px;
      `
      : `
      justify-content: center;
      `}

  @media (max-width: 768px) {
    padding-bottom: ${({ $hasMessages }) => ($hasMessages ? "24px" : "24px")};
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

const ChattingBarWrapper = styled.div<{ $hasMessages: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;

  ${({ $hasMessages }) =>
    $hasMessages
      ? `
      position: absolute;
      bottom: 40px; // 24px에서 40px로 증가
      left: 0;
      right: 0;
      padding: 16px 24px;
      background-color: #2c2c2e;
      `
      : `
      padding: 0;
      `}

  @media (max-width: 768px) {
    ${({ $hasMessages }) =>
      $hasMessages &&
      `
      position: absolute;
      bottom: 32px;
      padding: 12px 16px;
      z-index: 98;
      `}
  }
`;
