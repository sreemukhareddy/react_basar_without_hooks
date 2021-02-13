import React from "react";
import ProfilePic from "../assets/profile.png";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const profileCard = (props) => {
  const { username, displayName } = props.user;
  const showEditButton = props.isEditable && !props.inEditMode;
  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileImageWithDefault
          alt="profile"
          width="200"
          height="200"
          image={props.user.image}
          src={props.loadedImage}
          className="rounded-circle shadow"
        />
      </div>
      <div className="card-body text-center">
        {!props.inEditMode && <h4>{`${displayName}@${username}`}</h4>}
        <br />
        {/* {props.inEditMode && (
          
        )} */}
        <br />
        {props.inEditMode && (
          <div>
            <label>Change the displayname for the user {`${username}`}</label>
            <input
              className="mb-2"
              value={displayName}
              onChange={props.onChangeDisplayName}
            />
            <input
              className="form-control-file mt-2"
              type="file"
              onChange={props.onFileSelect}
            />
          </div>
        )}
        <br />
        {showEditButton && (
          <button
            className="btn btn-outline-success"
            onClick={props.onClickEdit}
          >
            <i className="fas fa-user-edit" />
            Edit
          </button>
        )}
        {props.inEditMode && (
          <div>
            <button
              className="btn btn-primary"
              onClick={props.onClickSave}
              disabled={props.pendingUpdateCall}
            >
              <i className="fas fa-save" />
              Save
            </button>
            <button
              className="btn btn-outline-secondary ml-1"
              onClick={props.onClickCancel}
              disabled={props.pendingUpdateCall}
            >
              <i className="fas fa-window-close" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default profileCard;
