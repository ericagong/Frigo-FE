import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import SocialLogin from "./pages/auth/SocialLogin";
import { TYPES } from "./components/auth/OAuths";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/kakaoLogin"
            element={<SocialLogin type={TYPES.KAKAO} />}
          />
          <Route
            path="/googleLogin"
            element={<SocialLogin type={TYPES.GOOGLE} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
