"use client";

import { useEffect, useState } from "react";
import { getAllComments, sendComment } from "./FirebaseFunctions";
import LoadingSkeleton from "./LoadingSkeleton";
import GlobalNoDataFound from "./GlobalNoDataFound";
import Swal from "sweetalert2";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [postAuthorId, setPostAuthorId] = useState("");

  const fetchComments = async () => {
    try {
      const allComments = await getAllComments();
      if (allComments.data) {
        const userComments = allComments.data
          .filter((commentItem) => commentItem.PostId === postId)
          .sort((a, b) => b.SentAt.seconds - a.SentAt.seconds);
        setComments(userComments);
      } else {
        console.log("Failed To Fetch All Comments");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return date.toLocaleString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommenting(true);
    try {
      const commentExists = comments.some(
        (avCommentes) =>
          avCommentes.SenderEmail.trim().toLowerCase() ===
            email.trim().toLowerCase() &&
          avCommentes.Message.trim().toLowerCase() ===
            message.trim().toLowerCase()
      );
      if (commentExists) {
        Swal.fire(
          "Comment Exists!",
          "A Comment With The Same Data Already Exists. Please Check Your Created Comments...",
          "error"
        );
        setCommenting(false);
        return;
      }
      const response = await sendComment(
        name,
        email,
        message,
        postId,
        postAuthorId
      );
      if (response.data) {
        Swal.fire(`Commented Successfully!`, `Taking You Back...`, "success");
        fetchComments();
      } else {
        Swal.fire(
          "We Were Unable To Send This Comment!",
          `${response.error}. Please Try Again...`,
          "error"
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCommenting(false);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchComments();
    setPostAuthorId(localStorage.getItem("UserId"));
  }, [postId]);

  return (
    <main>
      <h1 className="text-center fw-bold">User Comments</h1>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#commentModal"
      >
        Comment
      </button>
      <div
        className="modal fade"
        id="commentModal"
        tabIndex="-1"
        aria-labelledby="commentModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Comment</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rahul"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="rahul@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Message" className="form-label">
                    Message
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Its Truly Awesome!"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={commenting}
                >
                  {commenting ? "Commenting..." : "Comment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : comments.length === 0 ? (
        <GlobalNoDataFound missingItem="Comment" />
      ) : (
        <div className="comment-box">
          {comments.map((post) => (
            <div className="card text-bg-light m-3" key={post.id}>
              <div className="card-header">{post.Sender}</div>
              <div className="card-body">
                <h5 className="card-title">{post.Message}</h5>
                <p className="card-text">
                  <i>
                    Sent At: {post?.SentAt ? formatDate(post.SentAt) : "N/A"}
                  </i>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Comments;
