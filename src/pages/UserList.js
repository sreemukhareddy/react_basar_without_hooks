import React, { Component } from "react";
import * as apiCalls from "../api/apicalls";
import userListItem from "./UserListItem";
import UserListItem from "./UserListItem";

class UserList extends Component {
  state = {
    page: {
      number: 0,
      size: 3,
      content: [],
    },
  };

  loadData = (requestedPage = 0) => {
    apiCalls
      .listUsers({
        page: requestedPage,
        size: this.state.page.size,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          page: response.data,
          loadError: "",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loadError: "Unable to load users",
        });
      });
  };

  componentDidMount() {
    this.loadData();
  }

  clickNextHandler = () => {
    this.loadData(this.state.page.number + 1);
  };

  clickPreviousHandler = () => {
    this.loadData(this.state.page.number - 1);
  };

  render() {
    return (
      <div className="card">
        <h3 className="card-title m-auto">Users</h3>
        <div className="list-group list-group-flush">
          {this.state.page.content.map((user) => {
            return <UserListItem user={user} key={user.username} />;
          })}
        </div>
        <div>
          {!this.state.page.first && (
            <span
              className="float-right"
              style={{ cursor: "pointer" }}
              onClick={this.clickPreviousHandler}
            >
              {`${"< Previous"}`}
            </span>
          )}
          {!this.state.page.last && (
            <span
              className="float-right"
              style={{ cursor: "pointer" }}
              onClick={this.clickNextHandler}
            >
              {`${"Next >"}`}
            </span>
          )}
        </div>
        <div className="text-center text-danger">
          {this.state.loadError && <p>{this.state.loadError}</p>}
        </div>
      </div>
    );
  }
}

export default UserList;
