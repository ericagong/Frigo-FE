import { useContext, useCallback } from "react";
import AuthContext from "./context";
import { STEPS } from "./index";
import { ReactComponent as ILogo } from "../../assets/illustrations/frigo_logo_text.svg";
import LinkButton from "./LinkButton";
import styled from "styled-components";
import Input from "./Input";

const NAMES = {
  EMAIL: "email",
  ID: "id",
  PW: "password",
  CHECK: "check",
};

const SignUp = () => {
  const {
    state: { signUpInfo: info, signUpErrors: errors },
    actions: { setStep },
  } = useContext(AuthContext);

  const goSignIn = useCallback(() => {
    setStep(STEPS.SIGN_IN);
  }, [setStep]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onChange = useCallback(() => {}, []);

  const inputs = () => {
    return Object.values(NAMES).map((name) => (
      <Input key={`input_${name}`} name={name} onChange={onChange} />
    ));
  };

  return (
    <Root>
      <Header>
        <Logo />
        <LinkButton text="로그인" onClick={goSignIn} />
      </Header>
      <Form onSubmit={onSubmit}></Form>
    </Root>
  );
};

const Root = styled.div`
  padding: 3.2rem 3.7rem 2.3rem 3.7rem;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Logo = styled(ILogo)`
  margin-left: calc(14.3rem - 3.2rem);
`;

const Form = styled.form``;

export { NAMES };
export default SignUp;
