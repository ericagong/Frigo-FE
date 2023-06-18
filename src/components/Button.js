import styled from "styled-components";
import radius from "./styles/radius";

const Button = ({
  type = "button",
  icon = null,
  onClick = null,
  disabled = false,
  style,
  children,
}) => {
  return (
    <Root type={type} {...style} onClick={onClick} disabled={disabled}>
      {icon && (
        <LeftSection>
          <img src={icon} alt="icon" />
        </LeftSection>
      )}
      {children}
    </Root>
  );
};

const Root = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: ${(props) => props.margin || ""};
  width: 33.2rem;
  height: 5rem;
  background-color: ${(props) =>
    !props.disabled ? props.backgroundColor : props.disabledColor};
  border-radius: ${radius.square};
  border: ${(props) =>
    `1px solid ${
      !props.disabled
        ? props.borderColor || props.backgroundColor
        : props.disabledColor
    }`};
  &:hover {
    cursor: ${(props) => (!props.disabled ? "pointer" : "default")};
  }
`;

const LeftSection = styled.div`
  position: absolute;
  left: 5%;
`;

export default Button;
