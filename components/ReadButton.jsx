import Link from "next/link";

const ReadButton = () => {
  return (
    <Link href="/blogs" className="btn btn-info fw-semibold m-1 shadow-lg">
      <i className="bi bi-chevron-double-right"></i> Start Reading Now
    </Link>
  );
};

export default ReadButton;
