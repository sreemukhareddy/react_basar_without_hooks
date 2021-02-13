import React, { Component } from "react";
import * as apiCalls from "../api/apicalls";
import ProfileCard from "./ProfileCard";
import { connect } from "react-redux";
import HoaxFeed from "./HoaxFeed";
import Spinner from "../UI/Spinners";

class UserPage extends Component {
  state = {
    user: undefined,
    isLoading: false,
    inEditMode: false,
    originalDisplayName: undefined,
    pendingUpdateCall: false,
    image: undefined,
    errors: {},
  };

  clickHandler = (event) => {
    this.setState({
      inEditMode: true,
    });
  };

  onFileSelect = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  onClickCancel = (event) => {
    const user = this.state.user;
    user.displayName =
      this.state.originalDisplayName != undefined
        ? this.state.originalDisplayName
        : user.displayName;
    this.setState({
      inEditMode: false,
      user: user,
      image: undefined,
    });
  };

  onClickSave = () => {
    this.setState({
      pendingUpdateCall: true,
    });
    const userUpdate = {
      displayName: this.state.user.displayName,
      image: this.state.image.split(",")[1],
    };

    apiCalls
      .updateUser(this.props.loggedInUser.id, userUpdate)
      .then((res) => {
        const user = { ...this.state.user };
        user.image = this.state.image;
        this.setState(
          {
            inEditMode: false,
            originalDisplayName: undefined,
            pendingUpdateCall: false,
            user: user,
            image: undefined,
          },
          () => {
            const action = {
              type: "update-success",
              payload: user,
            };
            this.props.dispatch(action);
          }
        );
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        this.setState({
          pendingUpdateCall: false,
          errors,
        });
      });
  };

  onChangeDisplayName = (event) => {
    const user = { ...this.state.user };
    if (this.state.originalDisplayName === undefined) {
      this.setState({
        originalDisplayName: user.displayName,
      });
    }
    user.displayName = event.target.value;
    this.setState({
      user: user,
    });
  };

  componentDidMount() {
    console.log(this.props);
    const username = this.props.match.params.username;
    if (!username) return;
    this.loadUser();
  }

  loadUser = () => {
    const username = this.props.match.params.username;
    this.setState({
      userNotFound: false,
      isLoading: true,
    });
    apiCalls
      .getUser(username)
      .then((res) => {
        console.log("user data from api call getuserbyusername", res.data);
        this.setState({
          user: res.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          userNotFound: true,
          isLoading: false,
        });
      });
  };

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (!this.props.match.params.username) return;
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.loadUser();
    }
  }

  render() {
    // console.log("printing the state before rendering to ui", this.state.user);
    console.log(
      "printing the username from the route",
      this.props.match.params.username
    );
    let content = null;
    if (this.state.isLoading) {
      content = <Spinner />;
    }
    if (this.state.user) {
      const isEditable =
        this.props.loggedInUser.username === this.props.match.params.username;
      content = (
        <ProfileCard
          user={this.state.user}
          isEditable={isEditable}
          inEditMode={this.state.inEditMode}
          onClickEdit={this.clickHandler}
          onClickCancel={this.onClickCancel}
          onClickSave={this.onClickSave}
          onChangeDisplayName={this.onChangeDisplayName}
          pendingUpdateCall={this.state.pendingUpdateCall}
          loadedImage={this.state.image}
          onFileSelect={this.onFileSelect}
          errors={this.state.errors}
        />
      );
    } else if (this.state.userNotFound) {
      content = (
        <div className="alert alert-danger text-center">
          <div className="alert-heading">
            <i className="fas fa-exclamation-triangle fa-3x" />
          </div>
          <h5>User Not Found</h5>
        </div>
      );
    }
    return (
      <div>
        {content}
        <div className="row">
          <HoaxFeed user={this.props.match.params.username} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(UserPage);
