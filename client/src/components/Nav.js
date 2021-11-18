import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { removeToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import axios from "axios";
import SearchBar from "./SearchBar";
import '../styles/Nav.css'

const NavBar = ({ isLoggedIn, setIsLoggedIn, setFlyLocation, setFlyZoom}) => {
  const navigate = useNavigate();

  const loggingOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="custom-nav" variant="dark">
      <Container className="justify-content-center">
        <Navbar.Brand>LOGO</Navbar.Brand>
        <Navbar >
          <Form>
            <SearchBar placeholder="Search..." setFlyLocation={setFlyLocation} setFlyZoom={setFlyZoom} />
          </Form>
        </Navbar>
        <Navbar>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link className='text-muted' href="/">Home</Nav.Link>
                <Nav.Link className='text-muted' href="/profile">Profile</Nav.Link>
                <Nav.Link className='text-muted' href="/about">About</Nav.Link>
                <Nav.Link className='text-muted' onClick={loggingOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className='text-muted' href="/about">About</Nav.Link>
                <Nav.Link className='text-muted' href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default NavBar;
