import styled, { css } from "styled-components";
import { Text } from "../styles/Typography";

const LinkButton = ({ text, onClick, style }) => {
  return (
    <Root onClick={onClick} style={style}>
      <Text
        fontSize={`1.4rem`}
        lineHeight={`2.027rem`}
        style={{ textAlign: "right", textDecoration: "underline" }}
      >
        {text}
      </Text>
    </Root>
  );
};

const Root = styled.button`
  background: inherit;
  border: none;
  ${(props) =>
    props.style &&
    css`
			{...props.style}
	`}
  &:hover {
    cursor: pointer;
  }
`;

export default LinkButton;
