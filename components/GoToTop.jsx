import Link from "next/link";

const GoToTop = ({ goto }) => {
  return (
    <Link className="topbtn btn btn-warning shadow-lg rounded" href="/">
      <i className="bi bi-arrow-up-square-fill fs-4 fw-bold"></i>
    </Link>
  );
};

export default GoToTop;
