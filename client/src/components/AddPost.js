import { Container, Form } from "react-bootstrap"

const AddPost = () => {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm='2'>Title</Form.Label>
                    <Form.Control type='text' placeholder='Buckingham Palace' />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default AddPost