import styled from "styled-components";
import useChatToTop from "../../hooks/useChatToTop";
import { useEffect } from "react";

type MessageType = {
  sender: "user" | "ai";
  text: string;
};

type ChatMessagesProps = {
  messages: MessageType[];
  lastUserMessageRef: React.RefObject<null | HTMLDivElement>;
};

const ChatMessages = ({ messages, lastUserMessageRef }: ChatMessagesProps) => {
  const paddingBottom = useChatToTop(450);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      lastUserMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, lastUserMessageRef]);

  return (
    <Wrapper $paddingBottom={paddingBottom}>
      {messages.map((msg, index) => {
        const isLastUser =
          index === messages.length - 1 && msg.sender === "user";
        return (
          <Message
            key={index}
            ref={isLastUser ? lastUserMessageRef : null}
            $sender={msg.sender}
          >
            {msg.text}
          </Message>
        );
      })}
    </Wrapper>
  );
};

export default ChatMessages;

const Wrapper = styled.div<{ $paddingBottom: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom};
`;

const Message = styled.div<{ $sender: "user" | "ai" }>`
  background-color: ${({ $sender }) =>
    $sender === "user" ? "#555" : "#3a3a3c"};
  color: white;
  padding: 16px;
  border-radius: 30px;
  align-self: ${({ $sender }) =>
    $sender === "user" ? "flex-end" : "flex-start"};
  max-width: 70%;
  word-break: break-word;
  font-size: 15px;
`;
