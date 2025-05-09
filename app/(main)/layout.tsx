import { ReactNode } from "react";
import MainLayout from "./components/layouts/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}
