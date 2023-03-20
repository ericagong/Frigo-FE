import { useState, useMemo } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import borders from "../styles/borders";
import radius from "../styles/radius";
import { ReactComponent as IShow } from "../../assets/icons/eye_opened.svg";
import { ReactComponent as IHide } from "../../assets/icons/eye_closed.svg";
import { Text } from "../styles/Typography";

const Input = ({
  name,
  type,
  placeholder = null,
  value,
  error,
  validMsg,
  errorMsg,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow((prev) => !prev);
  };

  // TODO svg fill not working 문제 해결
  const getToggle = useMemo(() => {
    if (name !== "password") return null;
    return (
      <ToggleButton onClick={onToggle}>
        {!show ? (
          <IShow fill={colors.white_main} />
        ) : (
          <IHide fill={colors.white_main} />
        )}
      </ToggleButton>
    );
  }, [name, show]);

  const getMessage = () => {
    if (!value) return null;
    if (!error) return <Text color={colors.mint_main}>{validMsg}</Text>;
    else return <Text color={colors.orange_red_main}>{errorMsg}</Text>;
  };

  return (
    <Root>
      <InputWrapper>
        <RightSection>
          <InputText
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {getToggle}
        </RightSection>
      </InputWrapper>
      <GuideWrapper>{getMessage()}</GuideWrapper>
    </Root>
  );
};

const ToggleButton = styled.button`
  background: inherit;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 33.2rem;
  height: 5rem;
  padding: 0rem 1.4rem;
  background: ${colors.white_main};
  border: ${borders.input};
  border-radius: ${radius.square};
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center
	justify-content: space-between;
  width: 100%;
  height: 1.8rem;
  background: inherit;
  /* border: 1px solid red; */
`;

const InputText = styled.input`
  background: inherit;
  border: none;
  width: calc(100% - 4rem);
  /* border: 1px solid blue; */
  &:focus {
    outline: none;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0 0 ${colors.white_bg} inset;
  }
`;

const GuideWrapper = styled.div``;

export default Input;
