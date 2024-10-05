import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />;
    </div>
  );
};

export default SignInPage;
