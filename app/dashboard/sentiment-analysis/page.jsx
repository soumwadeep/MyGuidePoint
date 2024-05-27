"use client";

import { getAllComments } from "@/components/FirebaseFunctions";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sentiment from "sentiment";

const SentimentAnalysis = () => {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [badComments, setBadComments] = useState([]);

  const sentiment = new Sentiment();

  const fetchComments = async (userId) => {
    try {
      const allComments = await getAllComments();
      //   console.log("All comments", allComments);
      if (allComments.data) {
        const userComments = allComments.data
          .filter((commentItem) => commentItem.PostAuthorId === userId)
          .sort((a, b) => b.SentAt.seconds - a.SentAt.seconds);

        const negativeComments = userComments.filter((comment) => {
          const result = sentiment.analyze(comment.Message.toLowerCase());
          //   console.log(`Comment: ${comment.Message}, Sentiment Score: ${result.score}`);
          return result.score <= 3; // Identify negative sentiment
        });

        setComments(userComments);
        setBadComments(negativeComments);
      } else {
        console.log("Failed To Fetch All Comments");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("UserId");
    setUserId(storedUserId);
    if (storedUserId) {
      fetchComments(storedUserId);
    }
  }, []);

  return (
    <div className="text-center">
      <h1 className="fw-bold">Sentiment Analysis</h1>
      <p className="lh-lg">Here all the bad comments which has been published in your posts will be shown!</p>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          {badComments.length === 0 ? (
            <p>No bad comments found.</p>
          ) : (
            <div className="row">
              {badComments.map((comment) => (
                <div className="col-sm-4 mb-2" key={comment.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{comment.Sender}</h5>
                      <p className="card-text">{comment.Message}</p>
                      <Link
                        href={`/blogs/view?postId=${comment.PostId}`}
                        className="btn btn-info"
                      >
                        Visit Post
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
