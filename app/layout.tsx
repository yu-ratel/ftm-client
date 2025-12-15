import Header from "@/components/Header";
import "./globals.css";
import { ReactNode } from "react";
import ModalContainer from "@/components/modals/ModalContainer";
import ToastPopup from "@/components/modals/common/ToastPopup";
import SessionGuard from "@/components/guards/SessionGuard";
import QueryProvider from "./Provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <ModalContainer />
          <ToastPopup />
          <SessionGuard />
        </QueryProvider>
      </body>
    </html>
  );
}
