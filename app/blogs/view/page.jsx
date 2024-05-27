"use client";

import Comments from "@/components/Comments";
import { getPostById } from "@/components/FirebaseFunctions";
import GoToTop from "@/components/GoToTop";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewBlog = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostData = async () => {
    const pData = await getPostById(postId);
    if (pData.error) {
      console.error("Failed to fetch Post data:", pData.error);
    } else {
      setPostData(pData?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  return (
    <main>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="text-center">
          <h1 className="fw-bold text-capitalize">{postData.Title}</h1>
          <h5 className="text-end fw-semibold mb-3">
            - Posted By {postData.PosterName}
          </h5>
          <img
            src={postData.FeaturedImg}
            alt={postData.Title}
            className="rounded shadow-lg w-75 mb-3"
          />
          <p className="lh-lg">{postData.Description}</p>
        </div>
      )}
      <Comments postId = {postId}/>
      <GoToTop goto={`/blogs/view?postId=${postId}`} />
    </main>
  );
};

export default ViewBlog;
