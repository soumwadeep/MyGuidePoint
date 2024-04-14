import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "My Guide Point",
  description:
    "Your go-to destination for easy-to-understand, interactive guides on the latest tech and beyond.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
