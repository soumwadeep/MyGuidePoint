"use client";

import { useEffect, useState } from "react";
import { UserSignIn, getAllUsers } from "@/components/FirebaseFunctions";
import home1 from "@/img/home1.webp";

import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [users, setUsers] = useState([]);
  //   const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = async () => {
    const allUsers = await getAllUsers();
    if (allUsers.data) {
      setUsers(allUsers?.data);
    } else {
      console.log("Failed To Fetch All Users");
    }
  };
  // console.log("User", users);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const foundUser = users.find(
        (user) => user.Email.toLowerCase() === email.toLowerCase()
      );
      if (!foundUser) {
        Swal.fire(
          "User Doesn't Exist!",
          "A user with this email ID was not found. Please sign up to continue...",
          "error"
        );
        setIsSigningIn(false);
        return;
      }
      //   console.log(foundUser);
      //   setUserDetails(foundUser);
      const response = await UserSignIn(email, password);
      if (response.data) {
        Swal.fire(
          "Signed In Successfully!",
          `Welcome Back ${foundUser?.Name}`,
          "success"
        );
        localStorage.setItem("UserId", foundUser?.id);
        localStorage.setItem("UserName", foundUser?.Name);
        localStorage.setItem("UserEmail", foundUser?.Email);
        window.location.replace("/dashboard");
      } else {
        Swal.fire(
          "We Were Unable To Sign You In!",
          `${response.error}. Please try again...`,
          "error"
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningIn(false);
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main>
      <div className="row">
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <h1 className="fw-semibold">Sign In To My Guide Point</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                      Email Id
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="rohit123@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="rohit@2024"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success me-2"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? "Signing In..." : "Sign In"}
                  </button>
                  <Link
                    href="/sign-up"
                    className="btn btn-warning"
                    disabled={isSigningIn}
                  >
                    New User?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <Image
                  src={home1}
                  alt="home1"
                  placeholder="blur"
                  id="animateimg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
