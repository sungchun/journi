import React from "react";
import { useState, useEffect } from "react";
import { fetchProfile } from "../helpers/api";

const Feed = ({owner, title, description, rating, images, location, handleClick}) => {

    const [user, setUser] = useState('')

    useEffect(() => {   
        fetchProfile(owner).then(setUser)
    }, [])

    return (
        <section className='info'>
        <div className='user-info'>
           <img src={user.profileImage}/>
           <h4>{user.username}</h4>
        </div>
        <div className='posts'>
            <div className='posts-info'>
            <h3> {title} </h3>
            <h3 onClick={handleClick}> {location}</h3> 
            <h5> Ratings: {rating} </h5>
            <p>  {description} </p>
            </div>
            <div className='posts-image'>
                <img src={images [0]} />
            </div>
        </div>
        </section>
    )
}

export default Feed
