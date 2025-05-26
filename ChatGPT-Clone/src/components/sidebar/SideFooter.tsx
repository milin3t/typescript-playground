// SideFooter.tsx
import styled from "styled-components";

const SideFooter = () => {
  return (
    <Footer>
      <Plan>Upgrade plan</Plan>
    </Footer>
  );
};

export default SideFooter;

const Footer = styled.div`
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-top: 1px solid #444;
`;

const Plan = styled.div`
  color: #bbb;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;
