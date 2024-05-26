import Image from "next/image";
import logo from "@/img/logo.png";
import Link from "next/link";
import GoToTop from "@/components/GoToTop";

const Blogs = () => {
  return (
    <main>
      <Link href="/" className="nav-link">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3">
              <Image
                src={logo}
                className="img-fluid rounded-start cardimg"
                alt="logo"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="fw-bold text-capitalize">
                  How To Create An AWS Account?
                </h5>
                <p className="text-body-secondary col-12 text-truncate">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-body-secondary me-3">
                    May 26, 2024
                  </small>
                  <small className="text-body-secondary me-3">
                    <i className="bi bi-chat-dots-fill"></i>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <GoToTop />
    </main>
  );
};

export default Blogs;
