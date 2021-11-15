import { Nav, Navbar } from "react-bootstrap"

const Footer = () => {
    return (
        <Navbar fixed='bottom' collapseOnSelect expand="lg" bg="success" variant="dark" >
            <Nav.Link target='_blank' bg='dark' href='https://github.com/moniafavaro'>Monia Favaro</Nav.Link>
            <Nav.Link target='_blank' href='https://github.com/sungchun'>Preston Ng</Nav.Link>
            <Nav.Link target='_blank' href='https://github.com/ReiHysa'>Reisli Hysa</Nav.Link>
        </Navbar>
    )
}

export default Footer