import Link from "next/link";

const SignUpButton = () => {
  return (
    <Link href="/sign-up" className="btn btn-info fw-semibold m-1 shadow-lg">
      <i className="bi bi-box-arrow-right"></i> Sign Up Now
    </Link>
  );
};

export default SignUpButton;
