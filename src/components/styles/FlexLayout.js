import styled from "styled-components";

const FlexLayout = ({ children }) => {
  return <Root>{children}</Root>;
};

const Root = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default FlexLayout;
