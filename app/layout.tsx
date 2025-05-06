import Header from "@/components/Header";
import "./globals.css";
import QueryProvider from "./Provider";
import ModalContainer from "@/components/modals/ModalContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <ModalContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
