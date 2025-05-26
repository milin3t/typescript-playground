// GPTPlugins.tsx
import styled from "styled-components";

const GPTPlugins = () => {
  return (
    <Section>
      <Title>Explore GPTs</Title>
      <Item>image generator</Item>
      <Item>Scholar GPT</Item>
    </Section>
  );
};

export default GPTPlugins;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 13px;
  color: #aaa;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const Item = styled.div`
  color: white;
  padding: 8px 0;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;
