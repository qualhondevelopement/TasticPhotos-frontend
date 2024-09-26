import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap.min.css";
import "./css/style.css";
import InstallBootStrap from "@/components/utils/InstallBootStrap";
import Head from "next/head";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery apk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </Head>
      <body>
        <StoreProvider>
          <Toaster position="top-center" />

          <InstallBootStrap />
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
