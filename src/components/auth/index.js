import { useContext, useMemo } from "react";
import AuthContext from "./context";
import { STEPS } from "./constants";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth = () => {
  const {
    state: { step },
  } = useContext(AuthContext);

  const getStep = useMemo(() => {
    if (step === STEPS.SIGN_UP) return <SignUp />;
    else return <SignIn />;
  }, [step]);

  return <>{getStep}</>;
};

export { STEPS };
export default Auth;
