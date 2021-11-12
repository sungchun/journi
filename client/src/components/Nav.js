// import { useHistory } from 'react-router'
import {Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap'

const NavBar = () => {
    // const history = useHistory()

    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Container>
                <Navbar.Brand>LOGO</Navbar.Brand>
                <Navbar className="justify-content-end">
                    <Form>
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
                    <Nav className='me-auto'>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar

// logo
//search
// home
// profile
