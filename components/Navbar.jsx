"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/img/logo.png";
import AllBlockedLinks from "./AllBlockedLinks";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <main>
      {/* <Image src={logo} className="logo" alt="logo" placeholder="blur" /> */}
      <button
        className={`btn btn-info fw-bold menubtn mb-3 ${
          AllBlockedLinks.some((item) => pathname.includes(item.link))
            ? "d-none"
            : ""
        }`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        Menu
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            <Image
              src={logo}
              className="menubtno"
              alt="logo"
              placeholder="blur"
            />
            My Guide Point
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-center lh-lg">
          <Link href="/" className="nav-link fs-4">
            Home
          </Link>
          <Link href="/blogs" className="nav-link fs-4">
            Blogs
          </Link>
          <Link href="/sign-up" className="nav-link fs-4">
           Sign Up
          </Link>
          <Link href="/sign-in" className="nav-link fs-4">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
