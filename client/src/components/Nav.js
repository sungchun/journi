/// import { useHistory } from ‘react-router’/
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";

const NavBar = () => {
  ///const history = useHistory()/

  return (
    <NavBar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <NavBar.Brand>LOGO</NavBar.Brand>
        <NavBar className="justify-content-end">
          <form>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </form>
        </NavBar>
        <NavBar.Toggle />
        <NavBar.Collapse className="justify-content-end">
          <nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default NavBar;

/// logo/
///search/
/// home/
/// profile/
