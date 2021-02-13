import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";

export class UserSignUpPage extends Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    repeatPassword: "",
    loading: false,
    errors: null,
  };

  componentDidMount() {
    console.log("UserSignUpPage componentDidMount");
  }

  componentDidUpdate() {
    console.log("UserSignUpPage componentDidUpdate");
  }

  displayNameHandler = (event) => {
    this.setState({
      displayName: event.target.value,
    });
  };

  usernameHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  repeatPasswordHandler = (event) => {
    this.setState({
      repeatPassword: event.target.value,
    });
  };

  signUpHandler = (event) => {
    event.preventDefault();
    //alert("button clicked");
    this.setState({
      loading: true,
    });
    const user = {
      username: this.state.username,
      displayName: this.state.displayName,
      password:
        this.state.password == this.state.repeatPassword
          ? this.state.password
          : null,
    };
    this.props.actions
      .postSignUp(user)
      .then((res) => {
        //alert("response has come from the backedn");
        this.setState(
          {
            displayName: "",
            username: "",
            password: "",
            repeatPassword: "",
            loading: false,
            errors: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((apiError) => {
        console.log(apiError.response.data.errors);
        let errors = [];
        for (let key in apiError.response.data.errors) {
          console.log(key, apiError.response.data.errors[key]);
          errors.push({
            on: key,
            message: apiError.response.data.errors[key],
          });
        }
        this.setState({
          displayName: "",
          username: "",
          password: "",
          repeatPassword: "",
          loading: false,
          errors: errors,
        });
      });
  };

  componentWillUnmount() {
    console.log("UserSignUpPage component unmounted");
  }

  render() {
    console.log("UserSignUpPage Render method");

    //let content = <Spinner />;
    let content = (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );

    if (!this.state.loading) {
      content = (
        <div className="container">
          <h1 className="text-center">SignUp</h1>
          <div className="col-12 mb-3">
            <label>Display Name</label>
            <input
              className="form-control"
              placeholder="Your Display Name"
              value={this.state.displayName}
              onChange={this.displayNameHandler}
            />
          </div>
          <div className="col-12 mb-3">
            <label>Username</label>
            <input
              className="form-control"
              placeholder="Your Username"
              onChange={this.usernameHandler}
              value={this.state.username}
            />
          </div>
          <div className="col-12 mb-3">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Your Password"
              onChange={this.passwordHandler}
              value={this.state.password}
            />
          </div>
          <div className="col-12 mb-3">
            <label>Repeat Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Repeat Your Password"
              onChange={this.repeatPasswordHandler}
              value={this.state.repeatPassword}
            />
          </div>
          <button
            disabled={this.state.loading}
            className="btn btn-primary text-center"
            onClick={this.signUpHandler}
          >
            SignUp
          </button>
          <div>
            {this.state.errors
              ? this.state.errors.map((err) => (
                  <p key={err.message}>
                    {err.on} : {err.message}
                  </p>
                ))
              : null}
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postSignUp: (userdata) => dispatch(authActions.onSignUpHandler(userdata)),
    },
  };
};

export default connect(null, mapDispatchToProps)(UserSignUpPage);
