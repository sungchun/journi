import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { getToken } from "./helpers/auth";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import OtherProfile from "./pages/OtherProfile";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import NavBar from "./components/Nav";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import "./styles/Map.css";
import "./styles/App.css";

function App() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(25);
  const [zoom, setZoom] = useState(1);
  const [flyLocation, setFlyLocation] = useState([lng, lat]);
  const [flyZoom, setFlyZoom] = useState(1);
  //  const [profileMarkers, setProfileMarkers] = useState([])

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <body className="body">
        <header>
          <NavBar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            map={map}
            setFlyLocation={setFlyLocation}
            setZoom={setZoom}
            setFlyZoom={setFlyZoom}
          />
        </header>
        <main>
          <Routes>
            <Route
              path="/login"
              element={
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile/:id"
              element={
                <OtherProfile
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
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
                  setFlyLocation={setFlyLocation}
                  setFlyZoom={setFlyZoom}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
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
                  setFlyLocation={setFlyLocation}
                  setFlyZoom={setFlyZoom}
                />
              }
            />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/"
              element={
                <Home
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
                  setFlyLocation={setFlyLocation}
                  setFlyZoom={setFlyZoom}
                />
              }
            />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </Router>
  );
}

export default App;
