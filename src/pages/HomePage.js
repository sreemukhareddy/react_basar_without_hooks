import React, { Component } from "react";
import UserList from "./UserList";
import HoaxSubmit from "./HoaxSubmit";
import { connect } from "react-redux";
import HoaxFeed from "./HoaxFeed";

class HomePage extends Component {
  render() {
    return (
      <div>
        HomePage
        <div className="row">
          <div className="col-8">
            {this.props.loggedInUser.isLoggedIn && <HoaxSubmit />}
            <HoaxFeed />
          </div>
          <div className="col-4">
            <UserList />
          </div>
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

export default connect(mapStateToProps)(HomePage);
