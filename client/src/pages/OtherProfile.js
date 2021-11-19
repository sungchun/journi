import { Col, Container, Row, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchProfilePosts } from "../helpers/api.js";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { getToken } from "../helpers/auth.js";
import OtherProfileCard from "../components/OtherProfileCard";
import PostCard from "../components/PostCard";
import Map from "../components/Map.js";
import React from "react";
import axios from "axios";
import DisplayCard from "../components/DisplayCard.js";
// import ProfileCard from "../components/ProfileCard";
// import { fetchProfileInfo } from "../helpers/api";
// import { Link } from "react-router-dom";

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
  setFlyLocation,
  setFlyZoom,
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
  const [profilePosts, setProfilePosts] = useState([]);
  const [state, setState] = useState(false);
  const [postToDisplay, setPostToDisplay] = useState(null);

  useEffect(() => {
    fetchProfilePosts(id).then(setProfilePosts);
  }, []);

  useEffect(() => {
    if (!profilePosts) return;
    let postFeatures = [];
    profilePosts.forEach((post) => {
      const marker = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [],
        },
        properties: {
          title: post.location,
          id: post._id,
        },
      };
      postFeatures.push(marker);
    });
    postFeatures.forEach((feature) => {
      async function makeCoords() {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${feature.properties.title}.json?access_token=pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ`
          )
          .then((response) => {
            const { center } = response.data.features[0];
            feature.geometry.coordinates = center;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      makeCoords();
    });
    const { data } = geoJSON;
    data.features = postFeatures;
    setGeoJSON({ ...geoJSON, data });
  }, [profilePosts]);

  useEffect(() => {
    const logCheck = () => {
      const token = getToken();
      if (token === null) {
        navigate("/login");
      }
    };
    logCheck();
  }, []);

  async function handleClick(event) {
    const { innerHTML } = event.target;
    console.log("target", event.target);
    console.log("inner html", innerHTML);

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${innerHTML}.json?access_token=pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ`
      )
      .then((response) => {
        console.log(response);
        const { center } = response.data.features[0];
        console.log("center", center);
        setFlyLocation(center);
        setFlyZoom(15);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
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
      <Container className="mt-5">
        <Card.Body className="container-one">
          {profilePosts.map((posts) => (
            <>
              <PostCard
                {...posts}
                state={state}
                postId={posts._id}
                key={posts._id}
                handleClick={handleClick}
                setPostToDisplay={setPostToDisplay}
              />
            </>
          ))}
        </Card.Body>
      </Container>
      {postToDisplay ? (
        <Container>
          <DisplayCard
            postToDisplay={postToDisplay}
            setPostToDisplay={setPostToDisplay}
            handleClick={handleClick}
          />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default OtherProfile;
