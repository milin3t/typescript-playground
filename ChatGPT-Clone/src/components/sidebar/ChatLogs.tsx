import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type ChatLog = {
  id: string;
  title: string;
};

type ChatLogsProps = {
  chatLogs: ChatLog[];
};

const ChatLogs = ({ chatLogs }: ChatLogsProps) => {
  const navigate = useNavigate();

  const sortedLogs = [...chatLogs].sort((a, b) => Number(b.id) - Number(a.id));

  const handleClick = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Section>
      <Title>Today</Title>
      <List>
        {sortedLogs.map((log) => (
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
