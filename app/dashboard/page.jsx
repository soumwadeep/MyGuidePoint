"use client";

import { logOutUser } from "@/components/FirebaseFunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Dashboard = () => {
  const router = useRouter();
  const logOut = async () => {
    const result = await Swal.fire({
      title: "Log Out?",
      text: "Are You Sure,You Want To Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Me Out!",
    });
    if (result.isConfirmed) {
      const status = await logOutUser();
      if (status.error) {
        Swal.fire("Failed To Log Out!", "Please Try Again...", "error");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div>
      <h1>Welcome To Dashboard!</h1>
      <Link href="dashboard/post/create" className="btn btn-info me-2">
        <i className="bi bi-box-arrow-right"></i> Create A Post
      </Link>
      <button className="btn btn-danger" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
