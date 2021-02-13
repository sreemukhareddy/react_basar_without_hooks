import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    apiError: null,
    loading: false,
  };

  usernameChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
      apiError: null,
    });
  };

  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
      apiError: null,
    });
  };

  loginButtonHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const body = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.actions
      .postLogin(body)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          this.setState({
            apiError: error.response.data.message,
            loading: false,
          });
          console.log(this.props);
        } else {
          this.setState({
            apiError: "Unexpected Error Has Occured",
            loading: false,
          });
        }
      });
  };

  render() {
    let disabledButton = false;
    if (this.state.username === "" || this.state.password === "") {
      disabledButton = true;
    }
    let content = (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div className="col-12 mb-3">
          <label>Username</label> <br />
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.usernameChangeHandler}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.passwordChangeHandler}
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={disabledButton}
              onClick={this.loginButtonHandler}
            >
              Login
            </button>
          </div>
          {this.state.apiError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger">{this.state.apiError}</div>
            </div>
          )}
        </div>
      </div>
    );
    if (this.state.loading) {
      content = (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.onLoginHandler(body)),
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
