import React from "react";
import { Card, Container, Image, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import TripCard from "./TripCard";
// import { fetchProfileInfoTrips, updateProfileInformation, fetchProfileInfo, fetchProfileInfoBio, fetchProfileInfoImage, updateProfileInformationImage} from "../helpers/api";
import {fetchProfile, fetchProfilePosts} from '../helpers/api'
import { useParams } from 'react-router'


const OtherProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [follow, setFollow] = useState(false)

  const { id } = useParams()
  
  useEffect(() => {
    const fetching = () => {
    fetchProfile(id).then(setUserInfo);
    fetchProfilePosts(id).then(setUserPosts)
    }
    fetching()
  }, [])
 
  const following = () => {
      if (follow) {
          setFollow(false)
      } else {
          setFollow(true)
      }
  }


  return (
    
    <Container>
      {userInfo ? (
        <>
  <Card style={{ width: "14rem" }} className="text-center">
        
        
          <Image
              variant="top"
              src={userInfo.profileImage}
              roundedCircle
              />


     
      <Card.Header>{userInfo.username}</Card.Header>
        <Card.Body>
  
               <Card.Text>Followers: {userInfo.followers.length}</Card.Text>
               <Card.Text>Following: {userInfo.following.length}</Card.Text>

            {follow ? (
                <button onClick={following}>Unfollow</button>
            ):(
                <button onClick={following}>Follow</button>
            )}

            <Card.Text>{userInfo.profileBio}</Card.Text>

          <ListGroup variant="flush">
            <Card.Title>Posts: {userPosts.length}</Card.Title>
            <>
        {userPosts.map((posts) => (
              <TripCard {...posts} />
        ))}
        </>
          </ListGroup>
        </Card.Body>
      </Card>
        </>
      ) : (
        <>
        </>
      )}
      
    </Container>
  );

};

export default OtherProfileCard;
