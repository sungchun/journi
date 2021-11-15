import { Container, Form } from "react-bootstrap"

const AddPost = () => {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm='2'>Title</Form.Label>
                    <Form.Control type='text' placeholder='Buckingham Palace' />
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm='2'>Description</Form.Label>
                    <Form.Control type='text' placeholder='Nice place' />
                </Form.Group>
                <Form.Group controlId='formFileMultiple' className='mb-3'>
                    <Form.Label>Images</Form.Label>
                    <Form.Control type='file' multiple/>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default AddPost

// title: 'trip to Buckingham Palace',
// description: 'it was a really nice and sunny day at Buckingham palace',
// images: ['https://image.cnbcfm.com/api/v1/image/105349189-1532444279996gettyimages-469465519.jpg?v=1532444893&w=1600&h=900'],
// rating: 5,
// location: