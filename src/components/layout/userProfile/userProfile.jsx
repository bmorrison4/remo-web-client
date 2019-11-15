import React, { Component } from "react";
import axios from "axios";
import "./userProfile.css";
import { userProfile } from "../../../config/client/index";
import EditEmail from "./editEmail";

export default class UserProfile extends Component {
  state = {
    fetching: true,
    submitText: "Update",
    userData: {},
    editEmail: false,
    editEmailText: "( edit )",
    updated: ""
  };

  componentDidMount() {
    this.handleGetInfo();
  }

  handleUpdateEmail = async () => {
    console.log("Update Email");
  };

  handleGetInfo = async () => {
    const token = localStorage.getItem("token");

    await axios
      .post(
        userProfile,
        {},
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log("Response Data: ", response.data);
        if (!response.data.error || !response.error) {
          this.setState({ fetching: false, userData: response.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFetching = () => {
    return <div className="infos"> Fetching Infos ...</div>;
  };

  doSubmit = async () => {
    this.props.onCloseModal();
  };

  handleShowInfo = () => {
    const { editEmail } = this.state;
    const { email, username, created, id } = this.state.userData;

    return (
      <div>
        <div className="info-chunk">
          <div className="info-container">
            <div className="info-key"> username: </div>
            <div className="info-value"> {username} </div>
          </div>
          <div className="info-container">
            <div className="info-key"> user id: </div>
            <div className="info-value"> {id} </div>
          </div>
          <div className="info-container">
            <div className="info-key"> created: </div>
            <div className="info-value"> {created} </div>
          </div>
          <div className="info-container">
            <div className="info-key"> email: </div>
            <div className="info-value"> {email} </div>
            <div
              className="info-edit"
              onClick={() => {
                this.setState({ editEmail: !editEmail });
                if (!editEmail) this.setState({ updated: "" });
              }}
            >
              {editEmail ? "( cancel )" : "( edit )"}
            </div>
          </div>
          {editEmail ? this.handleEditEmail() : <React.Fragment />}
          <div className="info-container">
            <div className="info-key"> email verified: </div>
            <div className="info-value"> no </div>
            <div className="info-edit"> ( coming soon ) </div>
          </div>
        </div>
      </div>
    );
  };

  handleUpdated = e => {
    console.log(e);
    this.setState({ userData: e, updated: e.message });
    if (e.email) this.setState({ editEmail: false });
  };

  handleEditEmail = () => {
    return (
      <EditEmail
        updated={e => {
          this.handleUpdated(e);
        }}
      />
    );
  };

  handleUpdateStatus = () => {
    const { updated, editEmail } = this.state;
    if (updated !== "" && !editEmail) {
      return <div className="updated">{updated}</div>;
    }
    return <React.Fragment />;
  };

  render() {
    const { user } = this.props;
    const { fetching } = this.state;
    console.log(user);
    return (
      <div className="modal">
        {user.username}'s profile.
        {fetching ? this.handleFetching() : this.handleShowInfo()}{" "}
        {this.handleUpdateStatus()}
      </div>
    );
  }
}