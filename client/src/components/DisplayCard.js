import { useState, useEffect } from "react";
import { addComment } from "../helpers/api";

const DisplayCard = ({ postToDisplay, setPostToDisplay, handleClick }) => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({ text: comment });
  }, [comment]);

  function typeComment(event) {
    setComment(event.target.value);
    console.log(comment);
  }

  async function postComment(event) {
    event.preventDefault();
    console.log(comment);
    console.log("post id", postToDisplay.id);
    // axios.post(`/api/posts/${postToDisplay.id}/comments`, )
    //     .then((response) => {

    //     })
    window.location.reload();
    if (!data) return;
    addComment(postToDisplay.id, data);
  }

  function showLess() {
    setPostToDisplay(null);
  }

  return (
    <div>
      <div>
        <h2>{postToDisplay.title}</h2>
      </div>
      <h2 onClick={handleClick}>{postToDisplay.location}</h2>
      <div className="images-displaying">
        <img src={postToDisplay.images[0]} alt="something" />
      </div>
      <div className="description-displaying">
        <p>{postToDisplay.description}</p>
        <p>Rating: {postToDisplay.rating} Stars</p>
      </div>
      <div className="commments-displaying">
        {postToDisplay.comments.map((comment) => (
          <>
            <p>{comment.text}</p>
            <p>{comment.createdAt}</p>
          </>
        ))}
        <form onSubmit={postComment} onChange={typeComment}>
          <input type="text" placeholder="Add Comment" />
          <input type="submit" value="Post" />
        </form>
        <button className="button" onClick={showLess}>
          Show Less
        </button>
      </div>
    </div>
  );
};

export default DisplayCard;
