import Root from "../styles/FlexLayout";
import styled from "styled-components";
import colors from "../styles/colors";
import shadows from "../styles/shadows";
import borders from "../styles/borders";

const Layout = ({ children }) => {
  return (
    <Root>
      <Wrapper>{children}</Wrapper>
    </Root>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 40.6rem;
  min-height: 60.6rem;
  background-color: ${colors.white_bg};
  border: ${borders.basic};
  box-shadow: ${shadows.auth};
`;

export default Layout;
