import React from 'react'
import { Col, Container, Row, } from "react-bootstrap";
// import ProfileCard from "../components/ProfileCard";
import { useNavigate } from 'react-router';
import { getToken } from '../helpers/auth.js';
import { useEffect, useState } from "react";
// import { fetchProfileInfo } from "../helpers/api";
// import { Link } from "react-router-dom";
import Map from '../components/Map.js'
import OtherProfileCard from '../components/OtherProfileCard'

const OtherProfile = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom, flyLocation, flyZoom}) => {

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
          <OtherProfileCard />
        </Col>
        <Col lg={8}>
          <Map map={map} mapContainer={mapContainer} lng={lng} setLng={setLng} lat={lat} setLat={setLat}  zoom={zoom}setZoom={setZoom} flyLocation={flyLocation} flyZoom={flyZoom}/>
        </Col>
      </Row>
    </Container>
    )
}

export default OtherProfile
