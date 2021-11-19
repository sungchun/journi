import { Card, Container } from "react-bootstrap";
import React from "react";

function About() {
  return (
    <Container className="mt-5">
      <Card className="justify-content-center" border="success">
        <Card.Body>
          <Card.Title as="h3" className="text-center my-3">
            JOURNI
          </Card.Title>
          <Card.Text as="h5" className="text-center my-3">
            This is our first group project with React JS and Mongoose
          </Card.Text>
          <Card.Text as="h5" className="text-center my-3">
            Our aim was to create a functioning social media page which has a
            strong focus on pinpointing and rating locations!
          </Card.Text>
          <Card.Text as="h5" className="text-center my-3">
            We decided to strongly incorporate the use of a map to create a more
            technically challenging design!
          </Card.Text>
          <Card.Text as="h5" className="text-center my-3">
            {" "}
            Monia Favaro, Preston Ng, Reisli Hysa
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;
