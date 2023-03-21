import { ReactComponent as IUser } from "../../assets/icons/user.svg";
import { ReactComponent as ILock } from "../../assets/icons/lock_closed.svg";
import { useContext, useCallback, useMemo } from "react";
import AuthContext from "./context";
import { existValue } from "./validators";
import Input from "../Input";
import apis from "../../utils/axios";
import Header from "./Header";
import Button from "../Button";
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
      setErrors((prev) => ({ ...prev, [name]: !existValue(value) }));
    },
    [setInfo, setErrors]
  );

  console.log(info, errors);

  const getInputs = useMemo(() => {
    return Object.values(NAMES).map((name) => (
      <Input
        key={`input_${name}`}
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

  console.log(errors);

  const onComplete = useCallback(() => {
    const signIn = async () => {
      try {
        const response = await apis.sign_in(info);
        const { result, status } = response.data;
        if (result) {
          //	로그인 처리
          // 1. 토큰 저장
          // 2. 멤버 아이디, 닉네임, 프로필 이미지도 저장
        } else {
          switch (parseInt(status.code)) {
            case 208: // 잘못된 비밀번호
              setErrors((prev) => ({ ...prev, [NAMES.PW]: true }));
              break;
            case 205: // 가입되지 않은 이메일
              setErrors((prev) => ({ ...prev, [NAMES.EMAIL]: true }));
              break;
            default: // 이메일 인증 필요.
            // TODO 알림창 띄우기
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    signIn();
  }, [info]);

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
        <Button text="로그인" onClick={onComplete} disabled={getDisabled()} />
      </Form>
      <Footer />
    </Root>
  );
};

const Root = styled.div`
  padding: 3.2rem 3.7rem 2.3rem 3.7rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
`;

export { NAMES };
export default SignIn;
