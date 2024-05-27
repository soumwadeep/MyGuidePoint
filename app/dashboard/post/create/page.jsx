"use client";

import { useEffect, useState } from "react";
import { createPost, getAllPosts } from "@/components/FirebaseFunctions";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const fetchPosts = async () => {
    const allPosts = await getAllPosts();
    if (allPosts.data) {
      setPosts(allPosts?.data);
    } else {
      console.log("Failed To Fetch All Posts");
    }
  };
  // console.log("User", posts);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    try {
      const postExists = posts.some(
        (post) => post.Title.toLowerCase() === title.toLowerCase()
      );
      if (postExists) {
        Swal.fire(
          "Post Exists!",
          "A Post With This Title Id Already Exists. Please Login To Continue...",
          "error"
        );
        setIsPosting(false);
        return;
      }
      const response = await createPost(
        title,
        thumbnailImg,
        featuredImg,
        description,
        userName,
        userEmail,
        userId
      );
      if (response.data) {
        Swal.fire(
          "Post Created And Uploaded Successfully!",
          "Taking You Back...",
          "success"
        );
        router.push("/dashboard");
      } else {
        Swal.fire(
          "We Were Unable To Upload Your Post!",
          `${response.error}. Please Try Again...`,
          "error"
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPosting(false);
      setTitle("");
      setThumbnailImg("");
      setFeaturedImg("");
      setDescription("");
    }
  };

  useEffect(() => {
    fetchPosts();
    setUserId(localStorage.getItem("UserId"));
    setUserName(localStorage.getItem("UserName"));
    setUserEmail(localStorage.getItem("UserEmail"));
  }, []);

  return (
    <main>
      <h1 className="fw-semibold text-center">Create A Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="How to Get Twitter API Keys?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Thumbnail Image Url" className="form-label">
            Thumbnail Image Url
          </label>
          <input
            type="url"
            className="form-control"
            placeholder="https://images.unsplash.com/photo-1599153066743-08810dc8a419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdzJTIwZWMyfGVufDB8fDB8fHwwm"
            value={thumbnailImg}
            onChange={(e) => setThumbnailImg(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Featured Image Url" className="form-label">
            Featured Image Url
          </label>
          <input
            type="url"
            className="form-control"
            placeholder="https://images.unsplash.com/photo-1599153066743-08810dc8a419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdzJTIwZWMyfGVufDB8fDB8fHwwm"
            value={featuredImg}
            onChange={(e) => setFeaturedImg(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="We have to visit Twitter or X Developer Portal To Get Credentials..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success me-2"
          disabled={isPosting}
        >
          {isPosting ? "Posting" : "Post"}
        </button>
      </form>
    </main>
  );
};

export default CreatePost;
