import React from "react";

const Comments = (comment) => {
  const d = new Date(comment.createdAt);

  const dateValue = `${d.getHours()}:${d.getMinutes()}, ${d.getDate()}/${
    d.getMonth() + 1
  }/${d.getFullYear()} `;

  return (
    <div className="message-box">
      <p>{comment.text}</p>
      <p className="comment-date">{dateValue}</p>
    </div>
  );
};

export default Comments;
