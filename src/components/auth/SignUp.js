import { useContext, useCallback, useMemo } from "react";
import AuthContext from "./context";
import { STEPS } from "./index";
import { ReactComponent as ILogo } from "../../assets/illustrations/frigo_logo_text.svg";
import LinkButton from "./LinkButton";
import styled from "styled-components";
import Input from "./Input";
import { Text } from "../styles/Typography";
import colors from "../styles/colors";
import { isValidCheck, isValidEmail, isValidID, isValidPW } from "./validators";

const NAMES = {
  EMAIL: "email",
  ID: "id",
  PW: "password",
  CHECK: "check",
};

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

const SignUp = () => {
  const {
    state: { signUpInfo: info, signUpErrors: errors },
    actions: { setStep, setSignUpInfo: setInfo, setSignUpErrors: setErrors },
  } = useContext(AuthContext);

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
          console.log("check");
          console.log(info, info[NAMES.PW]);
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
          color={colors.gray8}
        >
          {LABELS[name]}
        </Text>
        <Input
          type={name !== NAMES.CHECK ? "text" : "password"}
          name={name}
          value={info[name]}
          error={errors[name]}
          validMsg={VALID_MSGS[name]}
          errorMsg={ERROR_MSGS[name]}
          onChange={onChange}
        />
      </InputWrapper>
    ));
  }, [info, errors, onChange]);

  return (
    <Root>
      <Header>
        <Logo />
        <LinkButton text="로그인" onClick={toSignIn} />
      </Header>
      <Form onSubmit={onSubmit}>{getInputs}</Form>
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

export { NAMES };
export default SignUp;
