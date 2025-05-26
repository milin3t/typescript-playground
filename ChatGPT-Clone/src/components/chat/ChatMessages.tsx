import styled from "styled-components";

type ChatMessagesProps = {
  messages: { sender: "user" | "ai"; text: string }[];
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <Wrapper>
      {messages.map((msg, index) => (
        <Message key={index} $sender={msg.sender}>
          {msg.text}
        </Message>
      ))}
    </Wrapper>
  );
};

export default ChatMessages;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
  width: 100%;
`;

const Message = styled.div<{ $sender: "user" | "ai" }>`
  background-color: ${({ $sender }) =>
    $sender === "user" ? "#555" : "#3a3a3c"};
  color: white;
  padding: 16px 16px;
  border-radius: 30px;
  align-self: ${({ $sender }) =>
    $sender === "user" ? "flex-end" : "flex-start"};
  max-width: 70%;
  word-break: break-word;
  font-size: 15px;
`;
