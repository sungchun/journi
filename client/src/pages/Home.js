import { useState, useEffect } from 'react'
// import axios from 'axios'
import Map from '../components/Map.js'
import { Card, Col, Container, Row } from "react-bootstrap";
import Map from '../components/Map.js'

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

  const navigate = useNavigate()

  useEffect(() => {
    const logCheck = () => {

      const token = getToken()
      console.log(token)
      if(token === null){
        navigate('/login')
      }
    }
    logCheck()
    
  }, [])

  

  return (
    <Container>
      <br />
      <Row>
        <Col border="success" lg={8}>
         <Map />
          <Map />
          <Card.Img
            variant="top"
            src="https://i.guim.co.uk/img/media/5623c9dc9aaa8e193450e818ee948dabdcb842e7/0_127_2362_1417/master/2362.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=bf0b8ed6d3ce1b65cf7da3587c2344c0"
          />
        </Col>
        <Col lg={3}>
          <Card.Text>
          </Card.Text>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

// map
// trip to ...
