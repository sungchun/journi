import { useState, useEffect } from "react";
import { addComment } from "../helpers/api";
import Comments from "./Comments";

const DisplayCard = ({ postToDisplay, setPostToDisplay, handleClick }) => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);

  // const d = new Date(postToDisplay.comments[0].createdAt);

  // const dateValue = `${d.getHours()} : ${d.getMinutes()}`;

  useEffect(() => {
    setData({ text: comment });
    console.log(postToDisplay);
  }, [comment]);

  function typeComment(event) {
    setComment(event.target.value);
  }

  async function postComment(event) {
    event.preventDefault();
    console.log(comment);
    console.log("post id", postToDisplay.id);

    window.location.reload();
    if (!data) return;
    addComment(postToDisplay.id, data);
  }

  function showLess() {
    setPostToDisplay(null);
  }

  return (
    <div className="display-card-border">
      <div className="display-card-holder">
        <div>
          <h2 className="display-title">{postToDisplay.title}</h2>
        </div>
        <h2 className="display-location" onClick={handleClick}>
          {postToDisplay.location}
        </h2>
        <div className="images-displaying">
          <img src={postToDisplay.images[0]} alt="something" />
        </div>
        <div className="description-displaying">
          <p>{postToDisplay.description}</p>
          <p>Rating: {postToDisplay.rating}/5</p>
        </div>
        <div className="commments-displaying">
          {postToDisplay.comments.map((comment) => (
            <>
              <Comments {...comment} />
            </>
          ))}
          <div className="add-comment">
            <form onSubmit={postComment} onChange={typeComment}>
              <input type="text" placeholder="Add Comment" />
              <input type="submit" value="Post" />
            </form>
          </div>
          <button className="button" onClick={showLess}>
            Show Less
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
