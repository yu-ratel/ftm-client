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
          {children}
          <ModalContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
