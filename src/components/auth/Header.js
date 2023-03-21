import { useContext, useCallback } from "react";
import AuthContext from "./context";
import { STEPS } from "./index";
import { ReactComponent as ILogo } from "../../assets/illustrations/frigo_logo_text.svg";
import LinkButton from "./LinkButton";
import styled from "styled-components";

const LINK_TEXTS = {
  [STEPS.SIGN_IN]: "회원 가입",
  [STEPS.SIGN_UP]: "로그인",
};

const TOGGLED_STEPS = {
  [STEPS.SIGN_IN]: [STEPS.SIGN_UP],
  [STEPS.SIGN_UP]: [STEPS.SIGN_IN],
};

const Header = () => {
  const {
    state: { step },
    actions: { setStep },
  } = useContext(AuthContext);

  const toggleStep = useCallback(() => {
    setStep(TOGGLED_STEPS[step]);
  }, [setStep, step]);

  return (
    <Root>
      <Logo />
      <LinkButton text={LINK_TEXTS[step]} onClick={toggleStep} />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.8rem;
`;

const Logo = styled(ILogo)`
  margin-left: calc(14.3rem - 3.2rem);
`;

export default Header;
