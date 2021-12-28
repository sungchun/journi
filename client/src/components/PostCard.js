import { Card, Container, Stack, Button } from "react-bootstrap";
import { deletePost } from "../helpers/api";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";
import "../styles/Profile.css";
import { useState } from "react";

const PostCard = ({
  title,
  rating,
  images,
  location,
  description,
  comments,
  state,
  postId,
  handleClick,
  setPostToDisplay,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);

  const handleDelete = (event) => {
    event.preventDefault();
    deletePost(postId);

    navigate("/profile");
    setState(true);
  };

  useEffect(() => {
    if (state) {
      window.location.reload();
    }
  }, [state]);
  function displayCard() {
    setPostToDisplay({
      title: title,
      rating: rating,
      images: images,
      location: location,
      description: description,
      comments: comments,
    });
  }

  return (
    <>
      <Container className=" container-two">
        <Card className="text-center border='success">
          <Card.Header as="h5" className="mb-3">
            {title}
          </Card.Header>
          <img src={images} width="100%" className="image-one"></img>
          <a className="a">
            <Card.Text onClick={handleClick}>{location}</Card.Text>
          </a>
          <button onClick={displayCard}>Show More</button>
          {state ? (
            <>
              <Stack className="col-md-6 mx-auto mb-3">
                <Button
                  type="button"
                  variant="outline-danger"
                  className="mt-3"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </>
          ) : (
            <></>
          )}
        </Card>
      </Container>
      <br />
    </>
  );
};

export default PostCard;
