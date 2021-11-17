import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/SearchBar.css";

export default function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('')

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      return value.city.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

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
            {filteredData.length === 0 ? <SearchIcon /> : <CloseIcon id='clearButton' onClick={clearInput} />}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="results">
            {filteredData.map((value, key) => {
              return (
                <a className="dataItem" href="#">
                  <p>{value.city}</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
