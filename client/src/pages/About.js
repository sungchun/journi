import { Card, Container } from 'react-bootstrap'
import React from 'react'

function About() {
    return (
        <Container className='mt-5'>
            <Card  className='justify-content-center' border='success'>
                <Card.Body>
                    <Card.Title as='h3' className='text-center my-3'>JOURNI</Card.Title>
                    <Card.Text as='h5' className='text-center my-3'>This is our first group project with React JS and Mongoose</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default About
