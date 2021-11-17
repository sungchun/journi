import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { getToken } from './helpers/auth'
import { useRef, useEffect, useState } from "react";
import AddTrip from "./pages/AddTrip";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import './styles/Map.css'
import './styles/App.css'
import About from "./pages/About";
    
  function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ'
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(0.12)
  const [lat, setLat] = useState(51.51)
  const [zoom, setZoom] = useState(9)
      
      
  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <Router>
      <header>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} map={map} />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} map={map} mapContainer={mapContainer} lng={lng} setLng={setLng} lat={lat} setLat={setLat} zoom={zoom} setZoom={setZoom} />} />
          <Route path='/addtrip' element={<AddTrip />} />
          <Route path='/about' element={<About />} />
          <Route path="/" element={<Home map={map} mapContainer={mapContainer} lng={lng} setLng={setLng} lat={lat} setLat={setLat} zoom={zoom} setZoom={setZoom}/>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
