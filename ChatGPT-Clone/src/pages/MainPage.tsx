import { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import ChatPanel from "../components/chat/ChatPanel";

// 타입은 단순하게 정의
type MessageType = {
  sender: "user" | "ai";
  text: string;
};

export type ChatLog = {
  id: string;
  title: string;
  messages: MessageType[];
};

const MainPage = () => {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>(() => {
    const stored = localStorage.getItem("chatLogs");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <Wrapper>
      <Sidebar chatLogs={chatLogs} />
      <ChatPanel setChatLogs={(logs) => setChatLogs(logs)} />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
