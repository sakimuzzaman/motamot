import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "একক অনলাইন জরিপের ফলাফল",
  description: "This is a একক অনলাইন জরিপের ফলাফল Page Layout",
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
