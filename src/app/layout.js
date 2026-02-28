import localFont from "next/font/local";
import "./globals.css";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "মতামত মঞ্চ",
  description: "মতামত মঞ্চ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ToastContainer position="top-center" autoClose={3000} />

        <div className="h-[100%] lg:min-h-[93vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
