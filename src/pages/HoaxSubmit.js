import React, { Component } from "react";
import InputComponent from "../Input/input";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { connect } from "react-redux";
import * as apiCalls from "../api/apicalls";

class HoaxSubmit extends Component {
  state = {
    focused: false,
    content: "",
    pendingApiCall: false,
    errors: {},
    file: undefined,
    image: undefined,
    attachment: undefined,
  };

  resetState = () => {
    this.setState({
      focused: false,
      content: "",
      pendingApiCall: false,
      errors: {},
      file: undefined,
      image: undefined,
      attachment: undefined,
    });
  };

  onClickHoaxify = (event) => {
    this.setState({
      pendingApiCall: true,
    });
    const body = {
      content: this.state.content,
      attachment: this.state.attachment,
    };
    apiCalls
      .postHoax(body, {
        username: this.props.loggedInUser.username,
        password: this.props.loggedInUser.password,
      })
      .then((res) => {
        this.resetState();
      })
      .catch((error) => {
        let errors = {};

        if (error.response.data && error.response.data.errors) {
          errors = error.response.data.errors;
        }
        this.setState({
          focused: false,
          content: "",
          pendingApiCall: false,
          errors,
        });

        console.log("errors from post hoax", this.state.errors);
      });
  };

  onChangeContent = (event) => {
    const content = event.target.value;
    this.setState({
      content,
      errors: {},
    });
  };

  onFocus = () => {
    this.setState({
      focused: true,
    });
  };

  onCancelButtonClick = () => {
    this.setState({
      focused: false,
      content: "",
      errors: {},
      file: undefined,
      image: undefined,
    });
  };

  onFileSelect = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.setState(
        {
          image: reader.result,
          file,
        },
        () => {
          this.uploadFile();
        }
      );
    };
    reader.readAsDataURL(file);
  };

  uploadFile = () => {
    const body = new FormData();
    body.append("file", this.state.file);
    apiCalls.postHoaxFile(body).then((response) => {
      this.setState({
        attachment: response.data,
      });
    });
  };

  render() {
    let textAreaClassName = "form-control w-100";
    if (this.state.errors.content) {
      textAreaClassName += " is-invalid";
    }
    return (
      <div className="card d-flex flex-row p-1">
        <ProfileImageWithDefault
          className="rounded-circle m-1"
          width="32"
          height="32"
          image={this.props.loggedInUser.image}
        />
        <div className="flex-fill">
          <textarea
            className={textAreaClassName}
            rows={this.state.focused ? 3 : 1}
            onFocus={this.onFocus}
            onChange={this.onChangeContent}
            value={this.state.content}
          />
          {this.state.errors.content && (
            <span className="invalid-feedback">
              {this.state.errors.content}
            </span>
          )}
          {this.state.focused && (
            <div>
              <div className="pt-1">
                <InputComponent type="file" onChanged={this.onFileSelect} />
                {this.state.image && (
                  <img
                    src={this.state.image}
                    width="128"
                    height="64"
                    className="mt-1 img-thumbnail"
                  />
                )}
              </div>
              <div className="text-right mt-1">
                <button
                  className="btn btn-success"
                  onClick={this.onClickHoaxify}
                  disabled={this.state.pendingApiCall}
                >
                  Hoaxify
                </button>
                <button
                  className="btn btn-danger ml-1"
                  onClick={this.resetState}
                  disabled={this.state.pendingApiCall}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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

export default connect(mapStateToProps)(HoaxSubmit);
