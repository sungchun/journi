import React from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import {
  updateProfileInformation,
  fetchProfileInfo,
  fetchProfileInfoBio,
  fetchProfileInfoImage,
  updateProfileInformationImage,
} from "../helpers/api";

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editBio, setEditBio] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [bio, setBio] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const fetching = () => {
      fetchProfileInfo().then(setUserInfo);
      fetchProfileInfoImage().then(setImage);
      fetchProfileInfoBio().then(setBio);
    };
    fetching();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBio = bio;
      updateProfileInformation(newBio);
    } catch (err) {
      console.log(err);
    }
    setEditBio(false);
  };

  const BioEdit = () => {
    setEditBio(true);
  };

  const imageState = () => {
    setEditImage(true);
  };

  const handleChange = (event) => {
    setBio(event.target.value);
  };

  const handleUpload = async (event) => {
    const data = new FormData();

    data.append("file", event.target.files[0]);
    data.append("upload_preset", uploadPreset);
    console.log("this is my uploadUrl:", uploadUrl);
    const res = await axios.post(uploadUrl, data);
    console.log("response ->", res);

    setImage(res.data.url);
    console.log(res.data.url);
    setEditImage(false);

    updateProfileInformationImage(res.data.url);
  };

  return (
    <>
      <Container>
        {userInfo ? (
          <>
            <Card className="text-center border-0">
              {!editImage ? (
                <>
                  <div className="profile-image">
                    <Image
                      className="card-image"
                      variant="top"
                      src={image}
                      roundedCircle
                    />
                  </div>
                  <div className="button-container">
                    <button
                      onClick={imageState}
                      className="button primary-button"
                    >
                      Edit Image
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label>Profile Image</label>
                  <input
                    className="input"
                    type="file"
                    onChange={handleUpload}
                  />
                </>
              )}
              <Card.Header as="h5" className="mt-3">
                {userInfo.username}
              </Card.Header>
              <Card.Body className="body">
                <Card.Text>
                  Followers: {userInfo.followers.length} Following:{" "}
                  {userInfo.following.length}
                </Card.Text>
                {!editBio ? (
                  <>
                    <Card.Text className="mt-3">{bio}</Card.Text>
                    <div className="button-container">
                      <button
                        className="button second-button"
                        onClick={BioEdit}
                      >
                        Edit Bio
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder={userInfo.profileBio}
                      onChange={handleChange}
                    />
                    <input type="submit" value="confirm changes" />
                  </form>
                )}
              </Card.Body>
            </Card>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default ProfileCard;
