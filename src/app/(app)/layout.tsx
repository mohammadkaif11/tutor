import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "~/components/navbar/navbar";
import { Providers } from "../../components/providers/Providerts";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <body className={`font-sans ${inter.variable}`}>
        {" "}
        <Providers>
          <Navbar></Navbar>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
