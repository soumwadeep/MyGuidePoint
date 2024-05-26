"use client";

import logo from "@/img/logo.png";
import Link from "next/link";
import GoToTop from "@/components/GoToTop";
import { getAllPosts } from "@/components/FirebaseFunctions";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import GlobalNoDataFound from "@/components/GlobalNoDataFound";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchPosts = async () => {
    const allPosts = await getAllPosts();
    if (allPosts.data) {
      setPosts(allPosts.data);
    } else {
      console.log("Failed To Fetch All Posts");
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      {loadingPosts ? (
        <LoadingSkeleton />
      ) : posts.length === 0 ? (
        <GlobalNoDataFound missingItem="Blogs" />
      ) : (
        posts.map((post) => (
          <Link href="/" className="nav-link" key={post.id}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={post.ThumbnailImg || logo}
                    className="img-fluid rounded-start cardimg"
                    alt="Post Thumbnail"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="fw-semibold">
                      <small className="text-body-secondary me-3">
                        <i className="bi bi-person-circle"></i>{" "}
                        {post.PosterName}
                      </small>
                    </p>
                    <h5 className="fw-bold text-capitalize">{post.Title}</h5>
                    <p className="text-body-secondary col-12 text-truncate">
                      {post.Description}
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary me-3">
                        {new Date(
                          post.PostedAt.seconds * 1000
                        ).toLocaleDateString()}
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
        ))
      )}
      <GoToTop />
    </main>
  );
};

export default Blogs;
