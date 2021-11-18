import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import axios from 'axios';
// import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router";
import { getToken } from "../helpers/auth.js";
import { useEffect, useState } from "react";
// import { fetchProfileInfo } from "../helpers/api";
// import { Link } from "react-router-dom";
import Map from "../components/Map.js";
import OtherProfileCard from "../components/OtherProfileCard";
import { fetchProfilePosts } from "../helpers/api.js";

const OtherProfile = ({
  map,
  mapContainer,
  setLng,
  setLat,
  setZoom,
  lat,
  lng,
  zoom,
  flyLocation,
  flyZoom,
}) => {
  const { id } = useParams();
  const [geoJSON, setGeoJSON] = useState({
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });
  const navigate = useNavigate();
  const [profilePosts, setProfilePosts] = useState([])

  useEffect(() => {
    fetchProfilePosts(id).then(setProfilePosts)
  }, []);

  useEffect(() => {
    if(!profilePosts) return
    let postFeatures = []
    profilePosts.forEach((post) => {
        const marker = {
          'type': "Feature",
          'geometry': {
            'type': "Point",
            'coordinates': [],
          },
          'properties': {
            'title': post.location,
            'id': post._id
          }
        }
        postFeatures.push(marker)
      })
    postFeatures.forEach((feature)=>{
      async function makeCoords(){
        axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${feature.properties.title}.json?access_token=pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ`
        )
        .then((response) => {
          const { center } = response.data.features[0];
          feature.geometry.coordinates = center
        })
      .catch((err) => {
        console.log(err);
      })
      }
      makeCoords()
    })
    const {data} = geoJSON
    data.features = postFeatures
    setGeoJSON({...geoJSON, data})
  }, [profilePosts])

  useEffect(() => {
    const logCheck = () => {
      const token = getToken();
      if (token === null) {
        navigate("/login");
      }
    };
    logCheck();
  }, []);

  return (
    <Container>
      <br />
      <Row>
        <Col lg={4}>
          <OtherProfileCard />
        </Col>
        <Col lg={8}>
          <Map
            map={map}
            mapContainer={mapContainer}
            lng={lng}
            setLng={setLng}
            lat={lat}
            setLat={setLat}
            zoom={zoom}
            setZoom={setZoom}
            flyLocation={flyLocation}
            flyZoom={flyZoom}
            geoJSON={geoJSON}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default OtherProfile;
