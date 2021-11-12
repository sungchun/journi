import { Card, Col, Container, Row } from "react-bootstrap"
import ProfileCard from "../components/ProfileCard"

const Profile = () => {

    return (
        <Container>
            <br />
            <Row>
                <Col lg={3}>
                    <ProfileCard />
                </Col>
                <Col lg={9}>
                    <Card.Img variant='top' src='https://i.guim.co.uk/img/media/5623c9dc9aaa8e193450e818ee948dabdcb842e7/0_127_2362_1417/master/2362.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=bf0b8ed6d3ce1b65cf7da3587c2344c0'/>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile