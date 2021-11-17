import { Container, Form, Row, Button, Col } from "react-bootstrap"

const AddPost = () => {
    return (
        <Container>
            <Form>
                <Row className='align-items-center justify-content-center'>
                    <Form.Group as={Row} className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label column sm='2'>Where</Form.Label>
                            <Form.Control type='text' placeholder='Buckingham Palace' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label column sm='2'>Description</Form.Label>
                            <Form.Control type='text' placeholder='Nice place' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formFileMultiple' className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label>Images</Form.Label>
                            <Form.Control type='file' multiple/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label>Rating</Form.Label>
                            <div key='inline-radio' className="mb-3">
                                <Form.Check
                                    inline
                                    label="1"
                                    name="group1"
                                    type='radio'
                                    id='inline-radio-1'
                                />
                                <Form.Check
                                    inline
                                    label="2"
                                    name="group1"
                                    type='radio'
                                    id='inline-radio-2'
                                />
                                <Form.Check
                                    inline
                                    label="3"
                                    name="group1"
                                    type='radio'
                                    id='inline-radio-3'
                                />
                                <Form.Check
                                    inline
                                    label="4"
                                    name="group1"
                                    type='radio'
                                    id='inline-radio-4'
                                />
                                <Form.Check
                                    inline
                                    label="5"
                                    name="group1"
                                    type='radio'
                                    id='inline-radio-5'
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Col xs='auto'>
                            <Form.Label column sm='2'>Location</Form.Label>
                            <Form.Control type='text' placeholder='London Eye' />
                        </Col>
                    </Form.Group>
                </Row>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddPost
