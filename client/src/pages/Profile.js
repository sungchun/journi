import { Col, Container, Row, Button, Stack } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router";
import { getToken } from "../helpers/auth.js";
import { useEffect } from "react";
// import { fetchProfileInfo } from "../helpers/api";
import Map from "../components/Map.js";

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
}) => {
  const navigate = useNavigate();

  const geoJSON = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-0.1425615, 51.500978],
          },
          properties: {
            title: "Buckingham Palace",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-0.287271, 51.479644],
          },
          properties: {
            title: "Kew Gardens",
          },
        },
      ],
    },
  };

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
          <ProfileCard />
          <Stack gap={2} className='col-md-6 mx-auto mb-3'>
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
  );
};

export default Profile;
