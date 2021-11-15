import React from "react";
import { Card, Container, Image, ListGroup } from "react-bootstrap";

const ProfileCard = () => {
  return (
    <Container>
      <Card style={{ width: "14rem" }} className="text-center">
        <Image
          variant="top"
          src="https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=690&h=930&7E4B4CAD-CAE1-4726-93D6A160C2B068B2"
          roundedCircle
        />
        <Card.Header>Mr Cat</Card.Header>
        <Card.Body>
          <Card.Text>
            A cat’s meow is used to communicate with humans, not other cats.
            Cats have more bones in their bodies than people
          </Card.Text>
          <ListGroup variant="flush">
            <Card.Title>Trips</Card.Title>
            <ListGroup.Item>London Eye</ListGroup.Item>
            <ListGroup.Item>Buckingham Palace</ListGroup.Item>
            <ListGroup.Item>Camden Town</ListGroup.Item>
            <ListGroup.Item>Oxford</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileCard;
