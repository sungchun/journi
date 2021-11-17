import React from 'react'
import { ListGroup } from "react-bootstrap";


const TripCard = ({trips}) => {
    return (
        <>
        {/* <ListGroupItem>{trips}</ListGroupItem> */}
        <h3>{trips}</h3>
        </>
    )
}

export default TripCard