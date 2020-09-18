import React, { Component } from "react";
import { Link } from "react-router-dom";

import Graph from "../graph/Graph";
import AddTask from "./AddTasks";
import "./Tasks.css";

class Tasks extends Component {
  state = {
    name: "",
    description: "",
    dueDate: "",
    subtasks: [],
    workingHours: {},
    tasks: [],
  };

  showWorkingHour = (id) => {
    this.setState({ graphOpen: true, newUserOpen: false, editUserOpen: false });
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i]._id === id) {
        this.setState({ currentTime: this.state.user[i].workingHours });
        break;
      }
    }
  };

  componentDidMount() {
    fetch("http://dashclick.herokuapp.com/admin/getAllTasks")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
          return;
        }
        this.setState({ tasks: data.tasks });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  printDate = (date) => {
    var d = new Date(date);
    return d.toDateString();
  };

  renderTasks = (tasks) => {
    return (
      <div className="row">
        {tasks.map((task, i) => {
          const address = "/task/" + task._id;
          return (
            <div
              className="card col-md-3"
              key={task._id}
              style={{ margin: "10px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <b>{task.name}</b>
                </h5>
                <p className="card-text">{this.printDate(task.dueDate)}</p>

                <p>{task.description}</p>
                <div className="text-right">
                  {task.user !== undefined ? (
                    <h5>{task.user.name}</h5>
                  ) : (
                    <button type="button" class="btn btn-primary">
                      <Link to={address}>Assign User</Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <>
        <div className="user-lists">
          <div
            class="modal fade"
            id="exampleModalLong"
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
                  {this.state.graphOpen && (
                    <Graph timing={this.state.currentTime} />
                  )}
                  {this.state.newUserOpen && <AddTask />}
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
        </div>
        <div className="container-fluid" style={{ marginLeft: "100px" }}>
          <h2 className="mt-5 mb-5">All Tasks</h2>
          {this.renderTasks(this.state.tasks)}
          <div
            className="card col-md-3 text-center"
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
            <div className="card-body text-center">
              <i style={{ fontSize: "100px" }} class="fa fa-plus-square"></i>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tasks;
