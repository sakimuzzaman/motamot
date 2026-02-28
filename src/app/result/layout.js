import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "সকল অনলাইন জরিপের ফলাফল",
  description: "This is a সকল অনলাইন জরিপের ফলাফল Page Layout",
};

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      {/* <Header/> */}
      {children}
      {/* Footer */}
    </div>
  );
}
