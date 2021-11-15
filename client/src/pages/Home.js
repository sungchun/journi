import { useState, useEffect } from 'react'
// import axios from 'axios'
import Map from '../components/Map.js'
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken } from "../helpers/auth";



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
