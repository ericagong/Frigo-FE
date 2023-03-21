import { ReactComponent as IUser } from "../../assets/icons/user.svg";
import { ReactComponent as ILock } from "../../assets/icons/lock_closed.svg";
import { useContext, useCallback, useMemo } from "react";
import AuthContext from "./context";
import Input from "../Input";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const NAMES = {
  EMAIL: "email",
  PW: "password",
};

const TYPES = {
  [NAMES.EMAIL]: "text",
  [NAMES.PW]: "password",
};

const ICONS = {
  [NAMES.EMAIL]: <IUser />,
  [NAMES.PW]: <ILock />,
};

const PLACEHOLDERS = {
  [NAMES.EMAIL]: "이메일",
  [NAMES.PW]: "비밀번호",
};

const ERROR_MSGS = {
  [NAMES.EMAIL]: "가입되지 않은 이메일입니다.",
  [NAMES.PW]: "올바르지 않은 비밀번호입니다.",
};

const SignIn = () => {
  const {
    state: { signInInfo: info, signInErrors: errors },
    actions: { setSignInInfo: setInfo, setSignInErrors: setErrors },
  } = useContext(AuthContext);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInfo((prev) => ({ ...prev, [name]: value }));
    },
    [setInfo]
  );

  const getInputs = useMemo(() => {
    return Object.values(NAMES).map((name) => (
      <Input
        type={TYPES[name]}
        name={name}
        icon={ICONS[name]}
        placeholder={PLACEHOLDERS[name]}
        value={info[name]}
        error={errors[name]}
        errorMsg={ERROR_MSGS[name]}
        onChange={onChange}
      />
    ));
  }, [info, errors, onChange]);

  const getDisabled = () => {
    for (const value of Object.values(errors)) {
      if (value !== false) return true;
    }
    for (const value of Object.values(info)) {
      if (value === "") return true;
    }
    return false;
  };

  return (
    <Root>
      <Header />
      <Form onSubmit={onSubmit}>
        {getInputs}
        {/* <Button
          text="회원 가입"
          onClick={onComplete}
          disabled={getDisabled()}
        /> */}
      </Form>
      <Footer />
    </Root>
  );
};

export default SignIn;

const Root = styled.div`
  padding: 3.2rem 3.7rem 2.3rem 3.7rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
`;
