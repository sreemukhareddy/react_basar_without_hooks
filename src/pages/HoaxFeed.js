import React, { Component } from "react";
import * as apiCalls from "../api/apicalls";
import Spinner from "../UI/Spinners";
import HoaxView from "./HoaxView";
import Modal from "../UI/Modal";

class HoaxFeed extends Component {
  state = {
    page: {
      content: [],
    },
    isLoading: false,
    newHoaxCount: 0,
    isLoadingOldHoaxes: false,
    isLoadingNewHoaxies: false,
  };

  checkCount = () => {
    const hoaxes = this.state.page.content;
    let topHoaxId = 0;
    if (hoaxes.length > 0) {
      topHoaxId = hoaxes[0].id;
    }
    //const topHoax = hoaxes[0];
    apiCalls.loadNewHoaxCount(topHoaxId, this.props.user).then((response) => {
      this.setState({
        newHoaxCount: response.data.count,
      });
    });
  };

  onClickLoadMore = () => {
    const hoaxes = this.state.page.content;
    if (hoaxes.length === 0) {
      return;
    }
    console.log("clicked load more button", hoaxes[hoaxes.length - 1].id);
    this.setState({
      isLoadingOldHoaxes: true,
    });
    apiCalls
      .loadOldHoaxes(hoaxes[hoaxes.length - 1].id, this.props.user)
      .then((response) => {
        console.log("printing the response from the backend", response.data);
        const page = { ...this.state.page };
        page.content = [...this.state.page.content, ...response.data.content];
        page.last = response.data.last;
        this.setState({
          page,
          isLoadingOldHoaxes: false,
        });
        console.log(
          "prinitng the state after load more from the response",
          this.state.page
        );
      })
      .catch((error) => {
        this.setState({
          isLoadingOldHoaxes: false,
        });
      });
  };

  onClickLoadNew = () => {
    this.setState({
      isLoadingNewHoaxies: true,
    });
    const hoaxes = this.state.page.content;
    let topHoaxId = 0;
    if (hoaxes.length > 0) {
      topHoaxId = hoaxes[0].id;
    }
    apiCalls
      .loadNewHoaxes(topHoaxId, this.props.user)
      .then((response) => {
        const page = { ...this.state.page };
        page.content = [...response.data, ...this.state.page.content];
        this.setState({
          page,
          newHoaxCount: 0,
          isLoadingNewHoaxies: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoadingNewHoaxies: false,
        });
      });
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    console.log("coming from home/user", this.props.user);
    apiCalls
      .loadHoaxes(this.props.user)
      .then((res) => {
        console.log(res);
        this.setState(
          {
            page: res.data,
            isLoading: false,
          },
          () => {
            this.counter = setInterval(this.checkCount, 3000);
          }
        );
        console.log(this.state.page.content);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      });
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  onClickDeleteHoax = (hoax) => {
    this.setState({
      modalVisible: true,
      hoaxToBedeleted: hoax,
    });
  };

  onClickModalCancel = () => {
    this.setState({
      modalVisible: false,
      hoaxToBedeleted: undefined,
    });
  };

  onClickModalOk = () => {
    apiCalls
      .deleteHoax(this.state.hoaxToBedeleted.id, {
        username: "username1",
        password: "password1",
      })
      .then((res) => {
        alert(res + " from the server");
        this.setState({
          modalVisible: false,
          hoaxToBedeleted: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modalVisible: false,
          hoaxToBedeleted: undefined,
        });
      });
  };

  render() {
    console.log("rendering the hoaxfeed", this.state.page.content);
    if (this.state.isLoading) {
      return <Spinner />;
    }
    if (this.state.page.content.length === 0 && this.state.newHoaxCount === 0) {
      return <div>There are no hoaxes</div>;
    }
    //const newHoaxCountMessage =
    return (
      <div>
        {this.state.newHoaxCount > 0 && (
          <div
            className="card card-header text-center"
            onClick={!this.state.isLoadingNewHoaxies && this.onClickLoadNew}
            style={{ cursor: "pointer" }}
          >
            {this.state.isLoadingNewHoaxies ? (
              <Spinner />
            ) : (
              `There is ${this.state.newHoaxCount}`
            )}
          </div>
        )}

        {this.state.page.content.map((hoax) => {
          return (
            <HoaxView
              key={hoax.id}
              hoax={hoax}
              onClickDelete={() => this.onClickDeleteHoax(hoax)}
              onClickModalCancel={this.onClickModalCancel}
            />
          );
        })}
        {this.state.page.last === false && (
          <div
            className="card card-header text-center"
            onClick={!this.state.isLoadingOldHoaxes && this.onClickLoadMore}
            style={{
              cursor: !this.state.isLoadingOldHoaxes
                ? "pointer"
                : "not-allowed",
            }}
          >
            {this.state.isLoadingOldHoaxes ? <Spinner /> : "Load More"}
          </div>
        )}
        <Modal
          visible={this.state.modalVisible}
          onClickCancel={this.onClickModalCancel}
          body={
            this.state.hoaxToBedeleted &&
            "Are u sure to delete " + this.props.user
          }
          onClickOk={this.onClickModalOk}
        />
      </div>
    );
  }
}

export default HoaxFeed;
