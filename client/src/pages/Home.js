// import { useState, useEffect } from 'react'
// import axios from 'axios'
import { Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  
  // useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const { data } = await axios.get('/api/posts')
  //         console.log(data)
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     getData()
  // }, [])

  return (
    <Container>
      <br />
      <Row>
        <Col border="success" lg={8}>
          <Card.Img
            variant="top"
            src="https://i.guim.co.uk/img/media/5623c9dc9aaa8e193450e818ee948dabdcb842e7/0_127_2362_1417/master/2362.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=bf0b8ed6d3ce1b65cf7da3587c2344c0"
          />
        </Col>
        <Col lg={3}>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer posuere erat a ante. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer posuere erat a ante.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer posuere erat a ante.
          </Card.Text>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

// map
// trip to ...
