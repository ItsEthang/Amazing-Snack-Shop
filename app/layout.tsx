import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Glory } from "next/font/google";
// import Navbar from "./Navbar";
import AuthProvider from "./auth/Provider";
import dynamic from "next/dynamic";
import GlobalProvider from "./GlobalProvider";
import QueryClientProvider from "./QueryClientProvider";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

const glory = Glory({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-glory",
});

export const metadata: Metadata = {
  title: "Amazing Snack Shop",
  description: "Welcome to my shop!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={glory.variable}>
      <body className={glory.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="amber" grayColor="olive">
              <GlobalProvider>
                <Navbar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </GlobalProvider>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
