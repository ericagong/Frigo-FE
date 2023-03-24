import { useNavigate, useSearchParams } from "react-router-dom";
import { TYPES } from "../../components/auth/OAuths";
import apis from "../../utils/axios";
import { useEffect } from "react";

const SocialLogin = ({ type }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getCode = () => {
    return searchParams.get("code");
  };

  const setUserToken = (token, refreshToken) => {
    localStorage.setItem("Authorization", token);
    localStorage.setItem("RefreshToken", refreshToken);
  };

  const setUserInfo = ({ member_id, username, profile_img }) => {
    localStorage.setItem("userId", member_id);
    localStorage.setItem("username", username);
    localStorage.setItem("profileImg", profile_img);
  };

  const getToken = async () => {
    let response;
    const code = getCode();
    if (type === "kakao") {
      response = await apis.sign_in_kakao({ code });
    } else {
      response = await apis.sign_in_google({ code });
    }

    const {
      result,
      content,
      status: { message },
    } = response.data;

    // TODO 이미 동일 메일로 가입한 유저가 소셜 로그인 시도하는 경우 에러 처리
    if (result) {
      console.log(message);
      navigate("/auth");
    }

    const { authorization, refresh_token } = response.headers;
    setUserToken(authorization, refresh_token);
    setUserInfo(content);
    // TODO 환영 alert 처리
    console.log("환영합니다.");
    navigate("/");
  };

  useEffect(() => {
    getToken();
  }, []);

  return <></>;
};

export default SocialLogin;
