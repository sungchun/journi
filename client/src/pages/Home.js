import { useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { getToken } from '../helpers/auth.js';
import Map from '../components/Map.js'
import TripCard from '../components/TripCard.js';

const Home = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom, flyLocation, flyZoom}) => {
  const navigate = useNavigate()
  const geoJSON = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-0.1425615, 51.500978]        
            },
            'properties': {
              'title': 'Buckingham Palace'
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-0.287271, 51.479644]
            },
            'properties': {
              'title': 'Kew Gardens'
            }
          }
        ]
      }
  }

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
        <Col lg={8}>
          <Map map={map} mapContainer={mapContainer} lng={lng} setLng={setLng} lat={lat} setLat={setLat}  zoom={zoom}setZoom={setZoom} flyLocation={flyLocation} flyZoom={flyZoom} geoJSON={geoJSON}/>
        </Col>
        <Col lg={3}>
          <TripCard />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
