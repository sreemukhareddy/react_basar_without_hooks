import React from "react";
import logo from "../assets/hoaxify-logo.png";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const userListItem = (props) => {
  let imageSource = logo;
  if (props.user.image) {
    //imageSource = `/images/profile/${props.user.image}`;
  }
  return (
    <Link
      to={"/" + props.user.username}
      className="user-group-item list-group-item-action"
    >
      <ProfileImageWithDefault
        className="rounded-circle"
        alt="profile"
        width="32"
        height="32"
        image={props.user.image}
      />
      <span className="pl-2">
        {`${props.user.displayName}@${props.user.username}`}
      </span>
    </Link>
  );
};

export default userListItem;
