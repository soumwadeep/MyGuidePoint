"use client";
import { useRouter } from "next/navigation";
const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="btn btn-danger shadow-sm mb-2"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
};

export default BackButton;
