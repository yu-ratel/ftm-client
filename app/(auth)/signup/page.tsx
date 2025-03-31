import React from "react";
import SignupFlow from "./components/SignupFlow";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* 이미지 영역 */}
      <div className="mb-12 flex h-[204px] w-full max-w-[392px] items-center justify-center rounded-[12px] bg-gray-100">
        {/* <img
          src="/globe.png"
          alt="지구본"
          className="h-full object-contain"
        /> */}
      </div>
      <SignupFlow />
    </div>
  );
};

export default SignupPage;
