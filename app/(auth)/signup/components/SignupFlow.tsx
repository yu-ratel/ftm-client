"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import EmailStep from "./steps/EmailStep";
import VerificationStep from "./steps/VerificationStep";
import PasswordStep from "./steps/PasswordStep";
import IntroductionStep from "./steps/IntroductionStep";
import { SignupRequest } from "../types";
import { AGE } from "../constants";

// 회원가입 단계를 enum으로 관리
enum SignupStep {
  EMAIL = "EMAIL",
  VERIFICATION = "VERIFICATION",
  PASSWORD = "PASSWORD",
  INTRODUCTION = "INTRODUCTION",
}

// 회원가입 데이터를 한 곳에서 관리

const SignupFlow = () => {
  const searchParams = useSearchParams();
  const isSocial = searchParams.get("social") === "true";

  const [currentStep, setCurrentStep] = useState<SignupStep>(
    isSocial ? SignupStep.INTRODUCTION : SignupStep.EMAIL
  );
  const [signupData, setSignupData] = useState<SignupRequest>({
    email: "",
    password: "",
    age: AGE.TWENTIES,
    hashtags: [],
  });

  const updateSignupData = (data: Partial<SignupRequest>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case SignupStep.EMAIL:
        setCurrentStep(SignupStep.VERIFICATION);
        break;
      case SignupStep.VERIFICATION:
        setCurrentStep(SignupStep.PASSWORD);
        break;
      case SignupStep.PASSWORD:
        setCurrentStep(SignupStep.INTRODUCTION);
        break;
      // INTRODUCTION은 최종 단계이므로 다음 단계 없음
    }
  };

  const handlePrevStep = () => {
    switch (currentStep) {
      case SignupStep.VERIFICATION:
        setCurrentStep(SignupStep.EMAIL);
        break;
      case SignupStep.PASSWORD:
        setCurrentStep(SignupStep.VERIFICATION);
        break;
      case SignupStep.INTRODUCTION:
        setCurrentStep(SignupStep.PASSWORD);
        break;
      // EMAIL은 첫 단계이므로 이전 단계 없음
    }
  };

  return (
    <>
      {currentStep === SignupStep.EMAIL && !isSocial && (
        <EmailStep
          email={signupData.email}
          onEmailSubmit={(email) => {
            updateSignupData({ email });
            handleNextStep();
          }}
        />
      )}

      {currentStep === SignupStep.VERIFICATION && (
        <VerificationStep
          email={signupData.email}
          onVerificationSuccess={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      )}

      {currentStep === SignupStep.PASSWORD && (
        <PasswordStep
          onPasswordSubmit={(password) => {
            updateSignupData({ password });
            handleNextStep();
          }}
          onPrevStep={handlePrevStep}
        />
      )}

      {currentStep === SignupStep.INTRODUCTION && (
        <IntroductionStep
          email={signupData.email}
          password={signupData.password}
          isSocial={isSocial}
          onPrevStep={handlePrevStep}
        />
      )}
    </>
  );
};

export default SignupFlow;
