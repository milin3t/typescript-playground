import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ChatLog = {
  id: string;
  title: string;
};

const ChatLogs = () => {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("chatLogs");
    if (stored) {
      setLogs(JSON.parse(stored));
    }
  }, []);

  const handleClick = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Section>
      <Title>Today</Title>
      <List>
        {logs.map((log) => (
          <Item key={log.id} onClick={() => handleClick(log.id)}>
            {log.title}
          </Item>
        ))}
      </List>
    </Section>
  );
};

export default ChatLogs;

const Section = styled.div`
  margin-top: 16px;
`;

const Title = styled.div`
  font-size: 13px;
  color: #aaa;
  margin-bottom: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  color: white;
  padding: 6px 0;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;
