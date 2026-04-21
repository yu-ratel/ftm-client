import AuthPageLogoImage from "../components/AuthPageLogoImage";
import SigninForm from "./components/SigninForm";

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <AuthPageLogoImage />
      <SigninForm />
    </div>
  );
}

export default Login;
