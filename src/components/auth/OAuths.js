import styled from "styled-components";
import IKakao from "../../assets/illustrations/kakao_logo.svg";
import IGoogle from "../../assets/illustrations/google_logo.svg";
import colors from "../styles/colors";
import Button from "../Button";
import { Text, fontWeights } from "../styles/Typography";

const TYPES = {
  KAKAO: "kakao",
  GOOGLE: "google",
};

const ICONS = {
  [TYPES.KAKAO]: IKakao,
  [TYPES.GOOGLE]: IGoogle,
};

const STYLES = {
  [TYPES.KAKAO]: { backgroundColor: colors.kakao },
  [TYPES.GOOGLE]: {
    backgroundColor: colors.white_bg,
    borderColor: colors.gray3,
  },
};

const TEXTS = {
  [TYPES.KAKAO]: "카카오 로그인",
  [TYPES.GOOGLE]: "구글 로그인",
};

const FONT_COLORS = {
  [TYPES.KAKAO]: colors.brown_main,
  [TYPES.GOOGLE]: colors.black_main,
};

// TODO .env로 이동하기
const BASE_URL = "http://localhost:3000";
const KAKAO_CLIENT_ID = "2b986d1b574416a7d6d064619545aaff";
const GOOGLE_CLIENT_ID =
  "230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com";

const KAKAO_REDIRECT_URI = `${BASE_URL}/kakaoLogin`;
const GOOGLE_REDIRECT_URI = `${BASE_URL}/googleLogin`;

const URIS = {
  [TYPES.KAKAO]: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`,
  [TYPES.GOOGLE]: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
};

const OAuths = () => {
  const getOAuths = () => {
    return Object.values(TYPES).map((type) => (
      <Redirect key={`oauth_${type}`} href={URIS[type]}>
        <Button icon={ICONS[type]} style={STYLES[type]}>
          <Text
            fontSize={`1.6rem`}
            fontWeight={fontWeights.medium}
            lineHeight={`1.875rem`}
            color={FONT_COLORS[type]}
          >
            {TEXTS[type]}
          </Text>
        </Button>
      </Redirect>
    ));
  };

  return <>{getOAuths()}</>;
};

const Redirect = styled.a`
  text-decoration: none;
`;

export { TYPES };
export default OAuths;
