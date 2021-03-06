import { Col, Container, Row, Button, Stack, Card } from "react-bootstrap";
import { fetchProfileInfo, fetchProfilePosts } from "../helpers/api";
import { fetchProfileInfoTrips } from "../helpers/api";
import { useEffect, useState } from "react";
import { getToken } from "../helpers/auth.js";
import { useNavigate } from "react-router";
import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import DisplayCard from "../components/DisplayCard";
import Map from "../components/Map.js";
import axios from "axios";
import "../styles/Profile.css";

const Profile = ({
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
  const navigate = useNavigate();
  const [geoJSON, setGeoJSON] = useState({
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });
  const [userInfo, setUserInfo] = useState(null);
  const [profilePosts, setProfilePosts] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [state, setState] = useState(true);
  const [postToDisplay, setPostToDisplay] = useState(null);

  useEffect(() => {
    fetchProfileInfo().then(setUserInfo);
    fetchProfileInfoTrips().then(setUserPosts);
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    fetchProfilePosts(userInfo.id).then(setProfilePosts);
  }, [userInfo]);

  useEffect(() => {
    if (!profilePosts) return;
    console.log("profileposts", profilePosts);
    let postFeatures = [];
    profilePosts.forEach((post) => {
      console.log("for loop");
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
      console.log("the marker", marker);
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
    console.log("the features", postFeatures);
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
      <Container className="mt-3 mb-4">
        <Row>
          <Col lg={4}>
            <ProfileCard />
            <Stack gap={2} className="col-md-6 mx-auto mb-3">
              <Button
                href="/addpost"
                type="button"
                variant="outline-info"
                className="mt-3"
              >
                Add new post
              </Button>
            </Stack>
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
          {userPosts.map((posts) => (
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

export default Profile;
