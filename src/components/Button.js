import { Text, fontWeights } from "./styles/Typography";
import colors from "./styles/colors";
import styled from "styled-components";
import radius from "./styles/radius";
import borders from "./styles/borders";

const Button = ({
  type = "button",
  icon = null,
  text,
  onClick,
  disabled = false,
  style,
}) => {
  return (
    <Root type={type} {...style} onClick={onClick} disabled={disabled}>
      {icon && <img src={icon} alt={`${text}_icon`} />}
      <Text
        fontSize={`2rem`}
        fontWeight={fontWeights.bold}
        lineHeight={`2.896rem`}
        color={colors.white_main}
      >
        {text}
      </Text>
    </Root>
  );
};

const Root = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: ${(props) => props.margin || ""};
  width: 33.2rem;
  height: 5rem;
  border-radius: ${radius.square};
  border: ${(props) => (!props.disabled ? borders.sign_in_button : "none")};
  background-color: ${(props) =>
    !props.disabled
      ? props.backgroundColor || colors.orange_main
      : colors.orange_red_sub};
  &:hover {
    cursor: ${(props) => (!props.disabled ? "pointer" : "default")};
  }
`;

export default Button;
