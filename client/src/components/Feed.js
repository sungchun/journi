import React from "react";
import { useState, useEffect } from "react";
import { fetchProfile } from "../helpers/api";

const Feed = ({
  owner,
  title,
  description,
  rating,
  images,
  location,
  comments,
  _id,
  handleClick,
  setPostToDisplay,
  handleUserClick,
}) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchProfile(owner).then(setUser);
  }, []);

  function displayPost() {
    setPostToDisplay({
      title: title,
      owner: owner,
      description: description,
      rating: rating,
      images: images,
      location: location,
      comments: comments,
      id: _id,
    });
  }

  return (
    <section className="info">
      <div className="user-info">
        <h3 onClick={handleUserClick}>{user.username}</h3>
      </div>
      <div className="posts">
        <div className="posts-info">
          <h3> {title} </h3>
          <h3> {location} </h3>
        </div>
        <button className="button" onClick={displayPost}>
          More
        </button>
      </div>
    </section>
  );
};

export default Feed;
