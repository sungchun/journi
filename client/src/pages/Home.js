import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getToken } from "../helpers/auth.js";
import Map from "../components/Map.js";
import PostCard from "../components/PostCard.js";
import { fetchProfileInfo, fetchProfile, fetchPosts } from "../helpers/api";
import axios from "axios";
import Feed from "../components/Feed.js";

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
  setFlyZoom
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

  useEffect(() => {
    fetchPosts().then(setAllPosts)
  }, [])

  useEffect(() => {
    if(!allPosts) return
    let postFeatures = []
    allPosts.forEach((post) => {
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
  }, [allPosts])


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
    console.log('following id :', followingId);

    if (!allPosts) return;
    console.log('all the posts here: ', allPosts)
    const res = allPosts.filter(f => followingId.includes(f.owner))
    setFeed(res)
    console.log("This is my res value!", res);
  }, [userInfo, followingId]);


  async function handleClick(event) {
    const {innerHTML} = event.target
   console.log('target', event.target)
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
      <Container>
        <br />
        <Container className='mb-5'>
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
        </Container>
        <Container className='mt-5'>
          {!feed ? (
            <>
            </>
          ): (
            <>
          <ul>
          {feed.map((posts) => (
            <li key={posts._id}>
              <Feed {...posts} userInfo={userInfo} map={map} setFlyLocation={setFlyLocation} setFlyZoom={setFlyZoom} handleClick={handleClick}/>
            </li>
          ))}
          </ul>
          </>)}
      </Container>
    </Container>
  );
};

export default Home
