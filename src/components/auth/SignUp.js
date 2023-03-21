import { isValidCheck, isValidEmail, isValidID, isValidPW } from "./validators";
import { useContext, useCallback, useMemo, useState } from "react";
import AuthContext from "./context";
import { STEPS } from "./index";
import { Text, fontWeights } from "../styles/Typography";
import apis from "../../utils/axios";
import { ReactComponent as ILogo } from "../../assets/illustrations/frigo_logo_text.svg";
import LinkButton from "./LinkButton";
import Input from "../Input";
import colors from "../styles/colors";
import Button from "../Button";
import styled from "styled-components";

const NAMES = {
  EMAIL: "email",
  ID: "username",
  PW: "password",
  CHECK: "check",
};

const DUPLICATE = "duplicatae";

const LABELS = {
  [NAMES.EMAIL]: "이메일",
  [NAMES.ID]: "닉네임",
  [NAMES.PW]: "비밀번호",
  [NAMES.CHECK]: "비밀번호 재확인",
};

const VALIDATORS = {
  [NAMES.EMAIL]: isValidEmail,
  [NAMES.ID]: isValidID,
  [NAMES.PW]: isValidPW,
  [NAMES.CHECK]: isValidCheck,
};

const ERROR_MSGS = {
  [NAMES.EMAIL]:
    "올바른 이메일은 @과 2글자 이상의 도메인 이름으로 구성되어야 합니다.",
  [NAMES.ID]:
    "닉네임은 2글자에서 20글자 사이의 영어 대/소문자/숫자/./_로 구성해야합니다.",
  [NAMES.PW]:
    "비밀번호는 5글자에서 20글자 사이의 문자열로 영어 대/소문자/숫자/특수문자 네 종류를 모두 포함해야합니다.",
  [NAMES.CHECK]: "비밀번호 재확인은 비밀번호와 일치해아합니다.",
};

const VALID_MSGS = {
  [NAMES.EMAIL]: "올바른 형식의 이메일입니다.",
  [NAMES.ID]: "올바른 형식의 닉네임입니다.",
  [NAMES.PW]: "올바른 형식의 비밀번호입니다.",
  [NAMES.CHECK]: "비밀번호 재확인 값이 비밀번호와 일치합니다.",
};

// TODO 이용약관, 개인정보 취급 방침 올바른 url 연결
// TODO label fontWeight 적용 안되는 이슈 잡기
// TODO 자동 완성 시 파란 배경 뜨지 않도록 css 처리
const SignUp = () => {
  const {
    state: { signUpInfo: info, signUpErrors: errors },
    actions: { setStep, setSignUpInfo: setInfo, setSignUpErrors: setErrors },
  } = useContext(AuthContext);

  const [submitErrMsg, setSubmitErrMsg] = useState("");

  const toSignIn = useCallback(() => {
    setStep(STEPS.SIGN_IN);
  }, [setStep]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInfo((prev) => ({ ...prev, [name]: value }));

      switch (name) {
        case NAMES.EMAIL:
          setErrors((prev) => ({
            ...prev,
            [name]: !VALIDATORS[name](value),
            [DUPLICATE]: false,
          }));
          setSubmitErrMsg("");
          break;
        case NAMES.ID:
          setErrors((prev) => ({ ...prev, [name]: !VALIDATORS[name](value) }));
          break;
        case NAMES.PW:
          setErrors((prev) => ({
            ...prev,
            [name]: !VALIDATORS[name](value),
            [NAMES.CHECK]: !VALIDATORS[NAMES.CHECK](value, info[NAMES.CHECK]),
          }));
          break;
        case NAMES.CHECK:
          setErrors((prev) => ({
            ...prev,
            [name]: !VALIDATORS[NAMES.CHECK](info[NAMES.PW], value),
          }));
          break;
        default:
          break;
      }
    },
    [info, setInfo, setErrors]
  );

  const getInputs = useMemo(() => {
    return Object.values(NAMES).map((name) => (
      <InputWrapper key={`input_${name}`}>
        <Text
          as={"label"}
          fontSize={`1.4rem`}
          lineHeight={`2.027rem`}
          fontWeight={fontWeights.bold}
          color={colors.gray8}
        >
          {LABELS[name]}
        </Text>
        <Input
          type={name !== NAMES.CHECK ? "text" : "password"}
          name={name}
          value={info[name]}
          error={
            name !== NAMES.EMAIL
              ? errors[name]
              : errors[name] || errors[DUPLICATE]
          }
          validMsg={VALID_MSGS[name]}
          errorMsg={
            name !== NAMES.EMAIL
              ? ERROR_MSGS[name]
              : submitErrMsg || ERROR_MSGS[name]
          }
          onChange={onChange}
        />
      </InputWrapper>
    ));
  }, [info, errors, submitErrMsg, onChange]);

  const toPolicy = useCallback((e) => {
    const { name } = e.target;
    window.open(`/${name}`, "_blank");
  }, []);

  const getDisabled = () => {
    for (const value of Object.values(errors)) {
      if (value !== false) return true;
    }
    for (const value of Object.values(info)) {
      if (value === "") return true;
    }
    return false;
  };

  console.log(errors, submitErrMsg);

  const onComplete = useCallback(() => {
    const signUp = async () => {
      try {
        const response = await apis.sign_up(info);
        console.log(response.data.status.code);
        switch (response.data.status.code) {
          case 200:
            // TODO 아이디 자동 완성해주기
            setStep(STEPS.SIGN_IN);
            break;
          default:
            setErrors((prev) => ({ ...prev, [DUPLICATE]: true }));
            setSubmitErrMsg(response.data.status.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    signUp();
  }, [info]);

  return (
    <Root>
      <Header>
        <Logo />
        <LinkButton text="로그인" onClick={toSignIn} />
      </Header>
      <Form onSubmit={onSubmit}>
        {getInputs}
        <Button
          text="회원 가입"
          onClick={onComplete}
          disabled={getDisabled()}
        />
      </Form>
      <Footer>
        <LinkButton text="이용약관" onClick={toPolicy} />
        <LinkButton text="개인정보 취급 방침" onClick={toPolicy} />
      </Footer>
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
  margin-bottom: 2.8rem;
`;

const Logo = styled(ILogo)`
  margin-left: calc(14.3rem - 3.2rem);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Footer = styled.div`
  box-sizing: border-box;
  width: 33.2rem;
  padding: 1rem 8rem;
`;

export { NAMES, DUPLICATE };
export default SignUp;
