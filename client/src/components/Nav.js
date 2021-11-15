import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { removeToken } from "../helpers/auth";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {

  const navigate = useNavigate()

  const loggingOut = () => {
    removeToken()
    setIsLoggedIn(false)
    navigate('/login')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const searchTerm = event.target.value
    const splitSearch = searchTerm.split('')
    axios.get('/api/posts')
      .then((response) => {
        const locations = response.data.map((post) =>{
          return post.location
        })
        locations.forEach((location) => {
          
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <Navbar.Brand>LOGO</Navbar.Brand>
        <Navbar className="justify-content-end">
          <Form onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Navbar>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
