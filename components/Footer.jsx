// "use client";

// import { usePathname } from "next/navigation";
import Link from "next/link";
// import AllBlockedLinks from "@/components/AllBlockedLinks";

const Footer = () => {
  // const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const launchYear = 2024;
  return (
    // <main
    //   className={`text-center mt-3 ${
    //     AllBlockedLinks.some((item) => pathname.includes(item.link))
    //       ? "d-none"
    //       : ""
    //   }`}
    // >
    <main>
      <Link className="text-center nav-link mt-3 fs-6" href="/">
        <p className="fw-semibold">
          &copy;&nbsp;
          {launchYear === currentYear
            ? currentYear
            : `${launchYear} - ${currentYear}`}
          &nbsp;My Gude Point. All Rights Reserved.
        </p>
      </Link>
    </main>
  );
};

export default Footer;
