import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { removeToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const NavBar = ({ isLoggedIn, setIsLoggedIn, map }) => {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const loggingOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const splitSearch = search.toLowerCase().split("");
    console.log(splitSearch);
    axios
      .get("/api/posts")
      .then((response) => {
        console.log(response.data);
        const locations = response.data.map((post) => {
          return post.location;
        });
        const searchTermCounter = {};
        const results = [];
        for (let i = 0; i < splitSearch.length; i++) {
          searchTermCounter[splitSearch[i]] =
            (searchTermCounter[splitSearch[i]] || 0) + 1;
        }

        console.log(searchTermCounter);
        locations.forEach((place) => {
          console.log("place", place);
          const placeCounter = {};
          place
            .toLowerCase()
            .split("")
            .forEach((character) => {
              if (searchTermCounter[character]) {
                placeCounter[place] = (placeCounter[place] || 0) + 1;
              }
            });
          if (placeCounter[place] / search.length >= 0.8) {
            results.push(placeCounter);
          }
          console.log("results counter", results);
        });
        let places = [];
        for (let place in results) {
          places.push([place, results[place]]);
        }
        places.sort((a, b) => {
          return a[1] - b[1];
        });
        places.reverse();
        console.log(places);
        setLocations(places);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClick(event) {
    const address = event.target.value;
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.place/${address}.json?access_token=pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ`
      )
      .then((response) => {
        const { center } = response.data;
        map.flyTo({
          center: center,
          essential: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container className="justify-content-center">
        <Navbar.Brand>LOGO</Navbar.Brand>
        <Navbar >
          <Form onChange={handleChange} onSubmit={handleSubmit}>
            <SearchBar placeholder="Search..." /* data={API data}*/ />
          </Form>
        </Navbar>
        <Navbar>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link onClick={loggingOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default NavBar;
