import { useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { getToken } from '../helpers/auth.js';
import Map from '../components/Map.js'

const Home = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom}) => {
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
          <Map map={map} mapContainer={mapContainer} lng={lng} setLng={setLng} lat={lat} setLat={setLat}  zoom={zoom}setZoom={setZoom}/>
        </Col>
        <Col lg={3}>
          {/* something -> trips  */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
