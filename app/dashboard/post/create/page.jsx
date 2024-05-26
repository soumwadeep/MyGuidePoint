"use client";

import { useEffect, useState } from "react";
import { createPost, getAllUsers } from "@/components/FirebaseFunctions";
import home1 from "@/img/home1.webp";

import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [users, setUsers] = useState([]);

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
    setIsSigningUp(true);
    try {
      const userExists = users.some(
        (user) => user.Email.toLowerCase() === email.toLowerCase()
      );
      if (userExists) {
        Swal.fire(
          "User Exists!",
          "A User With This Email Id Already Exists. Please Login To Continue...",
          "error"
        );
        setIsSigningUp(false);
        return;
      }
      const response = await createPost(name, email, password);
      if (response.data) {
        Swal.fire(
          "Signed Up Successfully!",
          `Welcome To My Guide Point ${name} !`,
          "success"
        );
        localStorage.setItem("UserId", response.data);
        localStorage.setItem("UserName", name);
        localStorage.setItem("Email", email);
        window.location.replace("/dashboard");
      } else {
        Swal.fire(
          "We Were Unable To Sign You Up!",
          `${response.error}. Please Try Again...`,
          "error"
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningUp(false);
      setName("");
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
                <h1 className="fw-semibold">Sign Up To My Guide Point</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rohit Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? "Signing Up..." : "Sign Up"}
                  </button>
                  <Link
                    href="/sign-in"
                    className="btn btn-warning"
                    disabled={isSigningUp}
                  >
                    Already An User?
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

export default CreatePost;
