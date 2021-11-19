import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { removeToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import axios from "axios";
import SearchBar from "./SearchBar";
import "../styles/Nav.css";

const NavBar = ({
  isLoggedIn,
  setIsLoggedIn,
  setFlyLocation,
  setFlyZoom,
  homeMarkers,
  setHomeMarkers,
}) => {
  const navigate = useNavigate();

  const loggingOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="custom-nav" variant="dark">
      <Container className="justify-content-center">
        <Navbar.Brand>
          <Nav.Link href="/">
            <img
              src="https://res.cloudinary.com/reisli82/image/upload/v1637321221/journi/logo-journi_bri501.png"
              style={{ width: "140px", height: "90px" }}
            ></img>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar>
          <Form>
            <SearchBar
              placeholder="Search..."
              setFlyLocation={setFlyLocation}
              setFlyZoom={setFlyZoom}
              homeMarkers={homeMarkers}
              setHomeMarkers={setHomeMarkers}
            />
          </Form>
        </Navbar>
        <Navbar>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link className="text-muted" href="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link className="text-muted" href="/about">
                  About
                </Nav.Link>
                <Nav.Link className="text-muted" onClick={loggingOut}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="text-muted" href="/about">
                  About
                </Nav.Link>
                <Nav.Link className="text-muted" href="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default NavBar;
