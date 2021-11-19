import { fetchProfileInfo, fetchPosts } from "../helpers/api";
import { useState, useEffect } from "react";
import { getToken } from "../helpers/auth.js";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import DisplayCard from "../components/DisplayCard";
import Feed from "../components/Feed.js";
import Map from "../components/Map.js";
import axios from "axios";
import "../styles/Home.css";

const Home = ({
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
  const [allPosts, setAllPosts] = useState(null);
  const [geoJSON, setGeoJSON] = useState({
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });
  const [userInfo, setUserInfo] = useState(null);
  const [followingId, setFollowingId] = useState(null);
  const [feed, setFeed] = useState(null);
  const [display, setDisplay] = useState(false);
  const [postToDisplay, setPostToDisplay] = useState(null);

  useEffect(() => {
    fetchPosts().then(setAllPosts);
  }, []);

  useEffect(() => {
    if (!allPosts) return;
    let postFeatures = [];
    allPosts.forEach((post) => {
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
  }, [allPosts]);

  useEffect(() => {
    const logCheck = () => {
      const token = getToken();
      console.log(token);
      if (token === null) {
        navigate("/login");
      }
      fetchProfileInfo().then(setUserInfo);
    };
    logCheck();
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    console.log("this is the user Details", userInfo);
    setFollowingId(userInfo.following);
    if (!followingId) return;
    console.log("following id :", followingId);
    if (!allPosts) return;
    console.log("all the posts here: ", allPosts);
    const res = allPosts.filter((f) => followingId.includes(f.owner));
    setFeed(res);
    console.log("This is my res value!", res);
  }, [userInfo, followingId, allPosts]);

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

  function handleUserClick(event) {
    const { innerHTML } = event.target;
    console.log("going to profile");
    axios
      .get("/api/profiles")
      .then((response) => {
        const correctUser = response.data.find((user) => {
          return user.username === innerHTML;
        });
        navigate("/");
        navigate(`/profile/${correctUser._id}`);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container className="mt-5 container-1">
      <br />
      <div className="holder">
        <Container className="mb-5">
          <div className="container-2">
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
          </div>
        </Container>
        <Container>
          <div className="container-3">
            {!feed ? (
              <p>Follow someone to see their posts!</p>
            ) : (
              <>
                <ul>
                  {feed.map((posts) => (
                    <li key={posts._id} className="feed-list">
                      <Feed
                        {...posts}
                        userInfo={userInfo}
                        map={map}
                        setFlyLocation={setFlyLocation}
                        setFlyZoom={setFlyZoom}
                        handleClick={handleClick}
                        postToDisplay={postToDisplay}
                        setPostToDisplay={setPostToDisplay}
                        handleUserClick={handleUserClick}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Container>
      </div>
      {postToDisplay ? (
        <Container className="container-4">
          <DisplayCard
            postToDisplay={postToDisplay}
            setPostToDisplay={setPostToDisplay}
            handleClick={handleClick}
          />
        </Container>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Home;
