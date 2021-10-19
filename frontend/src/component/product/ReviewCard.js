import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePNG from "../../Images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 20,
    value: review.rating,
    isHalf: true,
  };

  return <div className="reviewCard">
      <img src={profilePNG} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span>{review.comment}</span>
  </div>;
};

export default ReviewCard;
