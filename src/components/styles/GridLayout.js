import styled from "styled-components";

const GridLayout = ({ children, ...props }) => {
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

export const StGrid = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

export default GridLayout;
