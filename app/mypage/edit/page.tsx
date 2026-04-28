import { Suspense } from "react";
import MyPageEditPage from "./components/page";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyPageEditPage />
    </Suspense>
  );
}
