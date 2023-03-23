import { ReactComponent as IUser } from "../../assets/icons/user.svg";
import { ReactComponent as ILock } from "../../assets/icons/lock_closed.svg";
import { useContext, useCallback, useMemo } from "react";
import AuthContext from "./context";
import { existValue } from "./validators";
import Input from "../Input";
import apis from "../../utils/axios";
import colors from "../styles/colors";
import Header from "./Header";
import Button from "../Button";
import { Text, fontWeights } from "../styles/Typography";
import LinkButton from "./LinkButton";
import Footer from "./Footer";
import styled from "styled-components";
import borders from "../styles/borders";

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

  const onComplete = useCallback(() => {
    const signIn = async () => {
      try {
        const response = await apis.sign_in(info);
        const { result, status } = response.data;
        if (result) {
          //	로그인 처리
          console.log(response.header);
          // localStorage.setItem('authentication', response.header)
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

  const openModal = useCallback(() => {
    console.log("open modal");
  }, []);

  return (
    <Root>
      <Header />
      <Form onSubmit={onSubmit}>
        {getInputs}
        <Button
          onClick={onComplete}
          disabled={getDisabled()}
          style={{
            borderColor: colors.orange_main,
            backgroundColor: colors.orange_main,
            disabledColor: colors.orange_red_sub,
          }}
        >
          <Text
            fontSize={`2rem`}
            fontWeight={fontWeights.bold}
            lineHeight={`2.896rem`}
            color={colors.white_main}
          >
            회원가입
          </Text>
        </Button>
      </Form>
      <FindPW>
        <Text fontSize={`1.4rem`} lineHeight={`2.027rem`} color={colors.gray4}>
          혹시 비밀번호를 잊으셨나요?
        </Text>
        <LinkButton text="비밀번호 찾기" onClick={openModal} />
      </FindPW>
      <Divider>
        <Line />
        <Text fontSize={`1.4rem`} lineHeight={`2rem`} color={colors.gray4}>
          또는
        </Text>
        <Line />
      </Divider>
      <SocialLogin>
        <Button
          onClick={onComplete}
          style={{
            backgroundColor: colors.kakao,
          }}
        >
          <Text
            fontSize={`1.6rem`}
            fontWeight={fontWeights.medium}
            lineHeight={`1.875rem`}
            color={colors.brown_main}
          >
            카카오 로그인
          </Text>
        </Button>
        <Button
          onClick={onComplete}
          style={{
            backgroundColor: colors.white_bg,
            borderColor: colors.gray3,
          }}
        >
          <Text
            fontSize={`1.6rem`}
            fontWeight={fontWeights.medium}
            lineHeight={`1.875rem`}
            color={colors.black_main}
          >
            구글 로그인
          </Text>
        </Button>
      </SocialLogin>
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

const FindPW = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.2rem;
  margin-top: 2rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 33.2rem;
  height: 0.1rem;
  margin: 2.8rem 0 1.6rem 0;
`;

const Line = styled.div`
  width: 13.1rem;
  border: ${borders.line};
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export { NAMES };
export default SignIn;
