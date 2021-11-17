import { Col, Container, Row, Button } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from 'react-router';
import { getToken } from '../helpers/auth.js';
import { useEffect, useState } from "react";
import { fetchProfileInfo } from "../helpers/api";
import { Link } from "react-router-dom";
import Map from '../components/Map.js'



const Profile = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom}) => {
  


  const navigate = useNavigate()

  useEffect(() => {
    const logCheck = () => {
      const token = getToken()
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
        <Col lg={4}>
          <ProfileCard />
        </Col>
        <Col lg={8}>
          <Map map={map} mapContainer={mapContainer} lng={lng} setLng={setLng} lat={lat} setLat={setLat}  zoom={zoom}setZoom={setZoom}/>
        </Col>
        <Col lg={4}>
          <Link to='/addtrip'>
            <Button type='button' variant='outline-info'>Add Trip</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
