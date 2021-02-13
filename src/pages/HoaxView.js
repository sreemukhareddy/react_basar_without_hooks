import React, { Component } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class HoaxView extends Component {
  render() {
    const { hoax, onClickDelete } = this.props;
    const { user, date } = hoax;
    const { username, displayName, image } = user;
    const relativeDate = format(date);
    const attachmentImageVisible =
      hoax.attachment && hoax.attachment.fileType.startsWith("image");

    const ownedByLoggedInUSer = user.id === this.props.loggedInUser.id;

    return (
      <div className="card p-1">
        <div className="d-flex">
          <ProfileImageWithDefault
            className="rounded-circle m-1"
            width="32"
            height="32"
            image={image}
          />
          <div className="flex-fill m-auto pl-2">
            <Link to={`/${username}`} className="list-group-item-action">
              <h6 className="d-inline">
                {displayName}@{username}
              </h6>
            </Link>
            <span className="text-black-50">-{relativeDate}</span>
          </div>
          {ownedByLoggedInUSer && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={onClickDelete}
            >
              Delete
            </button>
          )}
        </div>
        <div className="pl-5">{hoax.content} </div>
        {attachmentImageVisible && (
          <div className="pl-5">
            <img alt="image" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(HoaxView);
