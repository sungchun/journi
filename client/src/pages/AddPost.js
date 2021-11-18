import React, { useState } from "react";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { postTrip } from "../helpers/api";

const AddPost = () => {
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    images: [],
    rating: 0,
    location: "",
  });

  const navigate = useNavigate()

  const handleChange = event => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormdata({ ...formdata, [event.target.name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault()
    postTrip(formdata)
    console.log(formdata)
    alert('You have submitted your form!!')
    navigate('/profile')
  };

  return (
    <Container className="mt-3">
      <Form border="success" onSubmit={handleSubmit}>
        <Row className="align-items-center justify-content-center">
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs="auto">
              <Form.Label column sm="2">
                Where
              </Form.Label>
              <Form.Control
                as="input"
                type="text"
                value={formdata.where}
                name="title"
                placeholder="Kew Gardens"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs="auto">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Form.Control
                as="input"
                type="text"
                value={formdata.description}
                name="description"
                placeholder="Nice place"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            controlId="formFileMultiple"
            className="mb-3 justify-content-center"
          >
            <Col xs="auto">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" name="images" multiple />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs="auto">
              <Form.Label>Rating</Form.Label>
              <div key="inline-radio" className="mb-3">
                <Form.Check
                  inline
                  label="1"
                  value='1'
                  name="rating"
                  type="radio"
                  onChange={handleChange}
                  checked={formdata.rating === '1'}
                />
                <Form.Check
                  inline
                  label="2"
                  value='2'
                  name="rating"
                  type="radio"
                  onChange={handleChange}
                  checked={formdata.rating === '2'}
                />
                <Form.Check
                  inline
                  label="3"
                  value='3'
                  name="rating"
                  type="radio"
                  onChange={handleChange}
                  checked={formdata.rating === '3'}
                />
                <Form.Check
                  inline
                  label="4"
                  value='4'
                  name="rating"
                  type="radio"
                  onChange={handleChange}
                  checked={formdata.rating === '4'}
                />
                <Form.Check
                  inline
                  label="5"
                  value='5'
                  name="rating"
                  type="radio"
                  onChange={handleChange}
                  checked={formdata.rating === '5'}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs="auto">
              <Form.Label column sm="2">
                Location
              </Form.Label>
              <Form.Control
                as="input"
                type="text"
                value={formdata.location}
                name="location"
                placeholder="Richmond, UK"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </Row>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Col xs="auto">
            <Button type="submit" value="Submit" variant="outline-success" onChange={handleChange}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddPost;
