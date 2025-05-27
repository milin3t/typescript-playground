import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateGeminiResponse } from "../../utils/gemini";

import ChatMessages from "./ChatMessages";
import ChattingBar from "./ChattingBar";
import ChatHeader from "./ChatHeader";
import { useSidebar } from "../../contexts/SidebarContext";
import { generateGeminiTitle } from "../../utils/titleGenerator";

type ChatPanelProps = {
  setChatLogs: (logs: ChatLog[]) => void;
};

type MessageType = {
  sender: "user" | "ai";
  text: string;
};

type ChatLog = {
  id: string;
  title: string;
  messages: MessageType[];
};

const ChatPanel = ({ setChatLogs }: ChatPanelProps) => {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const { id } = useParams();

  const [chatId, setChatId] = useState<string | null>(id || null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isRestoring, setIsRestoring] = useState(true);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);

    if (!id) {
      setChatId(null);
      setIsRestoring(false);
      return;
    }

    const savedLogs: ChatLog[] = JSON.parse(
      localStorage.getItem("chatLogs") || "[]"
    );

    const found = savedLogs.find((log) => log.id.toString() === id);

    if (found) {
      setMessages(found.messages);
      setChatId(id);
    } else {
      console.log("[복원] log 못 찾음 - 조건 불일치");
    }

    setIsRestoring(false);
  }, [id]);

  useEffect(() => {
    if (!chatId || messages.length === 0) return;

    const prevLogs: ChatLog[] = JSON.parse(
      localStorage.getItem("chatLogs") || "[]"
    );
    const updatedLogs = prevLogs.map((log) =>
      log.id.toString() === chatId ? { ...log, messages } : log
    );
    localStorage.setItem("chatLogs", JSON.stringify(updatedLogs));
  }, [chatId, messages]);

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: MessageType = { sender: "user", text };

    if (!chatId) {
      const newId = Date.now().toString();
      setChatId(newId);
      navigate(`/chat/${newId}`);

      const generatedTitle = await generateGeminiTitle(text);
      const newLog: ChatLog = {
        id: newId,
        title: generatedTitle,
        messages: [userMessage],
      };

      const prevLogs: ChatLog[] = JSON.parse(
        localStorage.getItem("chatLogs") || "[]"
      );
      const updatedLogs = [...prevLogs, newLog];

      localStorage.setItem("chatLogs", JSON.stringify(updatedLogs));

      setChatLogs(updatedLogs);
    }

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      if (lastUserMessageRef.current && scrollAreaRef.current) {
        const messageTop = lastUserMessageRef.current.offsetTop;
        scrollAreaRef.current.scrollTop = messageTop;
      }
    }, 0);

    try {
      const aiText = await generateGeminiResponse(text);
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error("Gemini API 오류:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Gemini 응답 실패" },
      ]);
    }
  };

  return (
    <Wrapper $isOpen={isOpen}>
      <ChatHeader />
      <MainPanel>
        <ContentWrapper $hasMessages={messages.length > 0}>
          {isRestoring ? null : messages.length === 0 ? (
            <TypingText>What can I help with?</TypingText>
          ) : (
            <ScrollableChatArea ref={scrollAreaRef}>
              <ChatMessages
                messages={messages}
                lastUserMessageRef={lastUserMessageRef}
              />
            </ScrollableChatArea>
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
  overflow-y: auto;

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
  padding-top: 56px; // ChatHeader 높이만큼 패딩 추가
`;

const ContentWrapper = styled.div<{ $hasMessages: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 820px;
  padding: 0 24px;
  height: 100%;
  position: relative;

  ${({ $hasMessages }) =>
    $hasMessages
      ? `
      justify-content: space-between;
      `
      : `
      justify-content: center;
      `}

  @media (max-width: 768px) {
    padding-bottom: ${({ $hasMessages }) => ($hasMessages ? "120px" : "24px")};
  }
`;

const TypingText = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
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
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px 24px;
      background-color: #2c2c2e;
      `
      : `
      padding: 0;
      `}

  @media (max-width: 520px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    background-color: #2c2c2e;
    z-index: 98;
  }
`;

const ScrollableChatArea = styled.div`
  flex: 1;
  width: 100%;
  padding-bottom: 80px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;
