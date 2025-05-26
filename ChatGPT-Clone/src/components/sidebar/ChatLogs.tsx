// ChatLogs.tsx
import styled from "styled-components";

const ChatLogs = () => {
  const chats = [
    "5줄 시 만들기",
    "이미지 생성 요청",
    "Help with Calculation",
    "무한스크롤 차단 프로그램",
  ];

  return (
    <Section>
      <Title>Today</Title>
      <List>
        {chats.map((text, i) => (
          <Item key={i}>{text}</Item>
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
