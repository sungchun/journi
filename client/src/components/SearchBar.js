import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {useNavigate} from 'react-router'
import "../styles/SearchBar.css";

export default function SearchBar({
  placeholder,
  map,
  setFlyLocation,
  setFlyZoom,
}) {
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    axios
      .get("/api/posts")
      .then((response) => {
        const filteredPosts = response.data.filter((post) => {
          return post.location.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(filteredPosts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/profiles")
      .then((response) => {
        const filteredProfiles = response.data.filter((user) => {
          return user.username.toLowerCase().includes(searchWord.toLowerCase())
        })
        if(searchWord === ''){
          setFilteredUsers([])
        }else{
          setFilteredUsers(filteredProfiles)
        }
    })
    .catch(err => console.log(err));
  };

  async function handleClick(event) {
    const { innerHTML } = event.target;
    const address = innerHTML;
    console.log("filtered posts", filteredData);
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ`
      )
      .then((response) => {
        console.log(response);
        const { center } = response.data.features[0];
        console.log("center", center);
        setFlyLocation(center);
        setFlyZoom(15);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUserClick(event){
    const {innerHTML} = event.target
    axios
      .get('/api/profiles')
      .then((response) => {
        const correctUser = response.data.find((user) => {
          return user.username === innerHTML
        })
        navigate('/')
        navigate(`/profile/${correctUser._id}`)
        window.location.reload()
      })
      .catch(err => console.log(err));
  }

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <Container>
      <div className="search">
        <div className="searchInput">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearButton" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length !== 0 && (<div className="dataResult">{filteredData.map((post) => {
              return (
                <li
                  className="dataItem"
                  onClick={handleClick}
                  value={post}
                  key={post._id}
                >
                  {post.location}
                </li>
              );
            })}
          </div>
        )}
        {filteredUsers.length !== 0 && (<div className="dataResult">{filteredUsers.map((user) => {
              return (
                <li
                  className="dataItem"
                  onClick={handleUserClick}
                  value={user}
                  key={user._id}
                >
                  {user.username}
                </li>
              );
            })}
          </div>
          
        )
        }
      </div>
    </Container>
  );
}
