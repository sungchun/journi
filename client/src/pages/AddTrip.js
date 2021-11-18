import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { getToken } from '../helpers/auth.js'

const AddTrip = () => {
    const [form, setForm] = useState('')

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value.trim()

        })
        console.log('handle ', form)
    }

  const handleSubmit = (event) => {
    event.preventDefault();

    let myForm = event.target;
    const formData = new FormData(myForm);
    console.log('form', formData)

    let url = "/api/trips";
    let requests = {
        body: formData,
      method: "POST",
        headers: { 
            'Authorization': `Bearer ${getToken}`
        },
    };

    fetch(url, requests)
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from server");
        console.log(data);
      })
      .catch(console.warn);
  };

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit} id="myForm">
        <Row>
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs="auto">
              <Form.Label column>Trip Title</Form.Label>
              <Form.Control
                as="input"
                type="text"
                id="trip-title"
                name="trip-title"
                placeholder="My trip to London"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs="auto">
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
                id="location"
                name="location"
                placeholder="London"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </Row>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Col xs="auto">
            <Button
              as="input"
              type="submit"
              value="Submit"
              variant="outline-success"
            />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddTrip;
