import React from "react";
import { Card, Container, Image, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchProfile,
  fetchProfilePosts,
  fetchProfileInfo,
  fetchFollow,
  fetchUnfollow,
} from "../helpers/api";
import { useParams } from "react-router";
import PostCard from "./PostCard";

const OtherProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [follow, setFollow] = useState(false);
  const [profile, setProfile] = useState("");
  const [reload, setReload] = useState(null);

  const [state, setState] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    const fetching = () => {
      fetchProfile(id).then(setUserInfo);
      fetchProfilePosts(id).then(setUserPosts);
      fetchProfileInfo().then(setProfile);
    };

    fetching();
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    if (!profile) return;
    setFollowingState();
    if (!reload) return;
    window.location.reload();
  }, [userInfo, profile, reload]);

  const following = () => {
    if (follow) {
      fetchUnfollow(id);
      setFollow(false);
      setReload(true);
    } else {
      fetchFollow(id);
      console.log(userInfo.followers);
      setFollow(true);
      setReload(true);
    }
  };

  const setFollowingState = () => {
    if (userInfo.followers.includes(profile.id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  };

  return (
    <Container>
      {userInfo ? (
        <>
          <Card style={{ width: "14rem" }} className="text-center">
            <Image variant="top" src={userInfo.profileImage} roundedCircle />
            <Card.Header>{userInfo.username}</Card.Header>
            <Card.Body>
              <Card.Text>Followers: {userInfo.followers.length}</Card.Text>
              <Card.Text>Following: {userInfo.following.length}</Card.Text>
              {follow ? (
                <button onClick={following}>Unfollow</button>
              ) : (
                <button onClick={following}>Follow</button>
              )}
              <Card.Text>{userInfo.profileBio}</Card.Text>
              <ListGroup variant="flush">
                <Card.Title>Posts: {userPosts.length}</Card.Title>
                <>
                  {userPosts.map((posts) => (
                    <PostCard {...posts} state={state} key={posts._id}/>
                  ))}
                </>
              </ListGroup>
            </Card.Body>
          </Card>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default OtherProfileCard;
