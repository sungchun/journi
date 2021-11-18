import React from "react";
import { Card, Container, Stack, Button } from "react-bootstrap";
import { deletePost } from "../helpers/api";
import { useNavigate } from "react-router";

const PostCard = ({ title, rating, images, location, state, postId }) => {
  const navigate = useNavigate()

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("test id", postId);
    deletePost(postId);
    navigate('/profile')
  };

  return (
    <>
      <Container>
        <Card className="text-center border='success">
          <Card.Header as="h5" className="mb-3">
            {title}
          </Card.Header>
          <img src={images} alt="image" width="100%"></img>
          <Card.Text className="mt-3">Rating: {rating} stars</Card.Text>
          <Card.Text>{location}</Card.Text>
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
