import React, { Component } from "react";
import { Link } from "react-router-dom";

import Graph from "../graph/Graph";
import makeToast from "../../components/Toaster";
import AddUser from "../AddUser/AddUser";
import EditUser from "../EditUser/EditUser";
import { deleteUser, getAllUsers } from "../../auth/index";

import "./User.css";

class User extends Component {
  state = {
    error: "",
    user: [],
    workingHours: {},
    userId: "",
    graphOpen: false,
    newUserOpen: false,
    editUserOpen: false,
    name: "",
    email: "",
    designation: "",
  };

  componentDidMount() {
    getAllUsers().then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        return;
      }
      this.setState({ user: data.user });
    });
  }

  updateUserHandler = () => {
    getAllUsers().then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        return;
      }
      this.setState({ user: data.user });
    });
  };

  showWorkingHour = (id) => {
    this.setState({ graphOpen: true, newUserOpen: false, editUserOpen: false });
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i]._id === id) {
        this.setState({ workingHours: this.state.user[i].workingHours });
        break;
      }
    }
  };

  deleteHandler = (e, id) => {
    e.preventDefault();
    deleteUser(id).then((res) => {
      if (res.error) {
        makeToast("error", "Request Failed");
        return;
      }
      makeToast("success", "Deleted Succesfully !!");
      let user = [...this.state.user];
      user = user.filter((user) => user._id !== id);
      this.setState({ user: user });
    });
  };

  render() {
    var data = this.state.user.map((ele) => {
      var add = "/user/" + ele._id;
      return (
        <tr className="list_data" key={ele._id}>
          <th style={{ color: "#39456B" }}>{ele.name}</th>
          <th style={{ color: "#FF4F73" }}>{ele.email}</th>
          <th>{ele.designation}</th>
          <th>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={() => this.showWorkingHour(ele._id)}
            >
              <i className="fa fa-calendar"></i>
            </button>
          </th>

          <th>
            <Link to={add}>
              <i className="fa fa-tasks"></i>
            </Link>
          </th>
          <th>
            {
              <button
                style={{ display: "inline-block", marginRight: "8px" }}
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalLong"
                onClick={(e) =>
                  this.setState({
                    userId: ele._id,
                    graphOpen: false,
                    newUserOpen: false,
                    editUserOpen: true,
                    email: ele.email,
                    designation: ele.designation,
                    name: ele.name,
                  })
                }
              >
                Edit
              </button>
            }
          </th>
          <th>
            <button
              style={{ display: "inline-block" }}
              className="btn btn-danger"
              onClick={(e) => this.deleteHandler(e, ele["_id"])}
            >
              Delete
            </button>
          </th>
        </tr>
      );
    });

    return (
      <div className="user-lists">
        <h1>All Users</h1>
        <div
          className="modal fade"
          id="exampleModalLong"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content" style={{ borderRadius: "50px" }}>
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.updateUserHandler()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.graphOpen && (
                  <Graph timing={this.state.workingHours} />
                )}
                {this.state.newUserOpen && <AddUser />}
                {this.state.editUserOpen && (
                  <EditUser
                    userId={this.state.userId}
                    email={this.state.email}
                    name={this.state.name}
                    designation={this.state.designation}
                    workingHours={this.state.workingHours}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.updateUserHandler()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <button
            className="add_user_button"
            type="button"
            style={{ position: "absolute", right: 50, top: 30 }}
            data-toggle="modal"
            data-target="#exampleModalLong"
            onClick={() =>
              this.setState({
                graphOpen: false,
                editUserOpen: false,
                newUserOpen: true,
              })
            }
          >
            Add User
          </button>
        </div>

        <div
          className="row"
          style={{
            overflow: "auto",
            top: 80,
            position: "absolute",
          }}
        >
          <div
            className="main_table"
            style={{ overflow: "auto", height: "800px" }}
          >
            <table className="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Working Hours</th>
                  <th style={{ float: "center" }}>Tasks</th>
                  <th style={{ paddingLeft: "30px" }}>Edit</th>
                  <th style={{ paddingLeft: "30px" }}>Delete</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
