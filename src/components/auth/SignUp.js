import { useCallback } from "react";
import { ReactComponent as ILogo } from "../../assets/illustrations/frigo_logo_text.svg";
import LinkButton from "./LinkButton";
import styled from "styled-components";

const SignUp = () => {
  const goSignIn = useCallback(() => {
    console.log("click login");
  }, []);

  return (
    <Root>
      <Header>
        <Logo />
        <LinkButton text="로그인" onClick={goSignIn} />
      </Header>
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

export default SignUp;
