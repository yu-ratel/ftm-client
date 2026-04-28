import { Suspense } from "react";
import MyPageEditPage from "./components/page";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyPageEditPage />
    </Suspense>
  );
}
