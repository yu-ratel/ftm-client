import React, { Suspense } from "react";
import AuthPageLogoImage from "../components/AuthPageLogoImage";
import SignupFlow from "./components/SignupFlow";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <AuthPageLogoImage className="mb-14" />
      <Suspense>
        <SignupFlow />
      </Suspense>
    </div>
  );
};

export default SignupPage;
