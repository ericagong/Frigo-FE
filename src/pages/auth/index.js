import Root from "../../components/auth/Layout";
import { AuthProvider } from "../../components/auth/context";
import A from "../../components/auth";

const Auth = () => {
  return (
    <Root>
      <AuthProvider>
        <A />
      </AuthProvider>
    </Root>
  );
};

export default Auth;
