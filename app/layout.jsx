import { Poppins } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import BootstrapClient from "@/components/BootstrapClient";

const poppins = Poppins({
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "My Guide Point",
  description:
    "Your go-to destination for easy-to-understand, interactive guides on the latest tech and beyond.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main className="container">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}
