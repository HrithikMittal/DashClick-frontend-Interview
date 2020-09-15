import React, { Component } from "react";
import Graph from "./graph/Graph";
import makeToast from "../components/Toaster";

class User extends Component {
  state = {
    error: "",
    user: [],
    currentTime: {},
  };

  componentDidMount() {
    fetch(`https://dashclick.herokuapp.com/admin/getAllUsers`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
          return;
        }
        this.setState({ user: data.user });
      })
      .catch((err) => {
        console.log("Error in Getting all the users", err);
      });
  }

  showWorkingHour = (id) => {
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i]._id === id) {
        this.setState({ currentTime: this.state.user[i].workingHours });
        break;
      }
    }
  };

  deleteHandler = (e, id) => {
    console.log(id);
    e.preventDefault();
    fetch(`https://dashclick.herokuapp.com/admin/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.error) {
          makeToast("error", "Request Failed");
          return;
        }
        console.log(res);
        makeToast("success", "Deleted Succesfully !!");
        let user = [...this.state.user];
        user = user.filter((user) => user._id !== id);
        this.setState({ user: user });
      })
      .catch((err) => makeToast("error", "Request Failed"));
  };

  render() {
    var data = this.state.user.map((ele) => {
      return (
        <tr key={ele._id}>
          <th></th>
          <th>{ele.name}</th>
          <th>{ele.email}</th>
          <th>{ele.designation}</th>
          <th>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={() => this.showWorkingHour(ele._id)}
            >
              <i class="fa fa-calendar"></i>
            </button>
          </th>

          <th>
            <i class="fa fa-tasks"></i>
          </th>
          <th>
            {
              <button
                style={{ display: "inline-block", marginRight: "8px" }}
                className="btn btn-primary"
                // onClick={(e) => this.startEditHandler(e, ele["_id"])}
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
      <>
        <div
          class="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Graph timing={this.state.currentTime} />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <button
            type="button"
            style={{ position: "absolute", right: 50, top: 30 }}
            class="btn btn-outline-success"
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
          <div style={{ overflow: "auto", height: "800px" }}>
            <table className="table " style={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Working Hours</th>
                  <th>Tasks</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default User;
