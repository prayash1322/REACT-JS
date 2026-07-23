import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <img
        src={props.img}
        alt="profile-image"
      />
      <h2>{props.username}</h2>
      <h4>Age : {props.age}</h4>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      <button>View Profile</button>
    </div>
  );
};

export default Card;
