import React from "react";
import profileImg from "../assets/profile.png";

const ProfileImageWithDefault = (props) => {
  let defaultImg = profileImg;
  if (props.image) {
    //defaultImg = `/images/profile/${props.image}`;
  }
  return (
    <img
      {...props}
      src={defaultImg}
      alt="image"
      onError={(event) => {
        event.target.src = defaultImg;
      }}
    />
  );
};

export default ProfileImageWithDefault;
