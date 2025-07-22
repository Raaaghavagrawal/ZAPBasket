import { Manrope } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
