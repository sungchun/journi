import React from "react";


const TripCard = ({title, rating, location}) => {

  return (
    <>
    
      <h3>{title}</h3>
      <h5>Rating: {rating} stars</h5>
      <p>{location}</p>
    </>
  );
};

export default TripCard;