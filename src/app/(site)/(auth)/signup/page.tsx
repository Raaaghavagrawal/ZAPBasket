import { Metadata } from "next";
import SignUp from "../../../components/auth/sign-up";

export const metadata: Metadata = {
  title: "Sign Up | ZAPBASKET",
};

const SignupPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignupPage;
