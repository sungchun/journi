import React from "react";
import { Card, Container, Image, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import TripCard from "./TripCard";
import { fetchProfileInfoTrips, updateProfileInformation, fetchProfileInfo, fetchProfileInfoBio} from "../helpers/api";



const ProfileCard = () => {

  const [userInfo, setUserInfo] = useState({})
  const [userTrips, setUserTrips] = useState([])
  const [editBio, setEditBio] = useState(false)
  const [editImage, setEditImage] = useState(false)
  const [bio, setBio] = useState()
  const [image, setImage] = useState()
   
  useEffect(() => {
    const fetching = () => {
      fetchProfileInfoTrips().then(setUserTrips)
      fetchProfileInfo().then(setUserInfo)
      fetchProfileInfoBio().then(setBio)
    }
    fetching()

  
  }, [])
  

 
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBio = bio
      updateProfileInformation(newBio)

    } catch (err) {
      console.log(err)
    }

    setEditBio(false)
     

  }

  const BioEdit = () => {
    setEditBio(true)
  }

  const handleChange = (event) => {
    setBio(event.target.value)
  }

  return (
    <Container>
      <Card style={{ width: "14rem" }} className="text-center">
      <Image
          variant="top"
          src={userInfo.profileImage}
          roundedCircle
          />
      <Card.Header>{userInfo.username}</Card.Header>
        <Card.Body>
          
          {/* <Card.Text>Followers: {userInfo.followers.length}</Card.Text>
          <Card.Text>Following: {userInfo.following.length}</Card.Text> */}

          {!editBio ? (<>
            <Card.Text>{bio}</Card.Text>
            <button onClick={BioEdit}>Edit Bio</button>
            </>
          ):( 
            <form onSubmit={handleSubmit}>
              <input type='text' placeholder={userInfo.profileBio} onChange={handleChange} />
              <input type='submit' value='confirm changes' />
            </form>
            )}
          <ListGroup variant="flush">
            <Card.Title>Trips</Card.Title>
            {userTrips.map((props) => {
              <TripCard {...props} />
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );

};

export default ProfileCard;
