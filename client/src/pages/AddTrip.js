import { Container, Form, Button, Row, Col } from "react-bootstrap"
import AddPost from "../components/AddPost"

const AddTrip = () => {
    return (
        <Container>
            <Form>
                <Row className='align-items-center justify-content-center'>
                    <Form.Group as={Row} className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label column>Trip Title</Form.Label>
                            <Form.Control type='text' placeholder='My trip to London' />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Col xs='auto'>
                            <Form.Label column sm='2'>Events</Form.Label>
                            <AddPost />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label column sm='2'>Location</Form.Label>
                            <Form.Control type='text' placeholder='London-UK' />
                        </Col>
                    </Form.Group>
                </Row>
                <Button as='input' type='submit' value='Submit' variant='outline-success' />
            </Form>
        </Container>
    )
}

export default AddTrip
