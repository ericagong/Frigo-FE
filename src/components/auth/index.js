import { useContext, useMemo } from "react";
import AuthContext from "./context";
import SignUp from "./SignUp";

const STEPS = {
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
};

const Auth = () => {
  const {
    state: { step },
  } = useContext(AuthContext);

  const getStep = useMemo(() => {
    if (step === STEPS.SIGN_UP) return <SignUp />;
    else return <div>STEPS.SIGN_IN</div>;
  }, [step]);

  return <>{getStep}</>;
};

export { STEPS };
export default Auth;
