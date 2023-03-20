import styled from "styled-components";

const Layout = ({ children, ...props }) => {
  return <Root {...props}>{children}</Root>;
};

const Root = styled.div`
  display: grid;
  padding: 2rem 8.4rem;
  grid-template-columns: repeat(12, 12fr);
  grid-gap: 2.8rem;
  grid-auto-rows: ${(props) => `minmax(${props.height}, auto)`};

  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 2rem 6rem;
  }

  /* mobile */
  @media all and (max-width: 600px) {
    padding: 0rem 1.6rem;
    grid-template-columns: repeat(4, 4fr);
    grid-gap: 1.6rem;
  }
`;

export default Layout;
