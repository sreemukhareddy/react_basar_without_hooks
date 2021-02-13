import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/hoaxify-logo.png";
import ProfileImageWithDefault from "../pages/ProfileImageWithDefault";

class TopBar extends Component {
  state = {
    dropDownVisible: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.onClickTracker);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickTracker);
  }

  onClickTracker = (event) => {
    if (this.actionArea && !this.actionArea.contains(event.target)) {
      this.setState({
        dropDownVisible: false,
      });
    }
  };

  onClickMyProfile = () => {
    this.setState({
      dropDownVisible: false,
    });
  };

  onClickDisplayName = (event) => {
    this.setState((prevState) => {
      return {
        dropDownVisible: !prevState.dropDownVisible,
      };
    });
    // this.setState({
    //   dropDownVisible: true,
    // });
  };

  assignActionArea = (area) => {
    this.actionArea = area;
  };

  logoutHandler = (event) => {
    // event.preventDefault();
    //alert("logout clicked");
    this.setState({
      dropDownVisible: false,
    });
    localStorage.removeItem("user");
    const logout = {
      type: "logout-success",
    };
    this.props.dispatch(logout);
    //this.props.history.push("/login");
  };

  render() {
    console.log("rendering the topbar", this.props.user);
    let links = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            SignUp
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    if (this.props.user.isLoggedIn) {
      let dropDownClass = "p-0 shadow dropdown-menu";
      if (this.state.dropDownVisible) {
        dropDownClass += " show";
      }
      links = (
        <ul className="nav navbar-nav ml-auto" ref={this.assignActionArea}>
          <li
            className="nav-item dropdown"
            style={{
              cursor: "pointer",
            }}
          >
            <div
              className="d-flex"
              style={{ cursor: "pointer" }}
              onClick={this.onClickDisplayName}
            >
              <ProfileImageWithDefault
                className="rounded-circle"
                width="32"
                height="32"
              />
              <span className="nav-link dropdown-toggle">
                {this.props.user.displayName}{" "}
              </span>
            </div>
          </li>
          <div className={dropDownClass}>
            <Link
              to={`/${this.props.user.username}`}
              className="dropdown-item"
              onClick={this.onClickMyProfile}
            >
              MyProfile
            </Link>
            <span
              className="dropdown-item"
              onClick={this.logoutHandler}
              style={{
                cursor: "pointer",
              }}
            >
              Logout
            </span>
          </div>
        </ul>
      );
    }
    return (
      <div className="bg-white shadow-sm mb-2">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand">
            <Link to="/" className="navbar-brand">
              <img src={logo} width="60" alt="Hoaxify" /> Hoaxify
            </Link>
            {links}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(TopBar);
