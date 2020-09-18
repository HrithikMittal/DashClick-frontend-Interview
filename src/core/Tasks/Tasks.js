import React, { Component } from "react";
import { Link } from "react-router-dom";
import makeToast from "../../components/Toaster";
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
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i]._id === id) {
        this.setState({ currentTime: this.state.tasks[i].workingHours });
        break;
      }
    }
  };

  updateTasksHandler = () => {
    fetch(`https://dashclick.herokuapp.com/admin/getAllTasks`)
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
        console.log("Error in Getting all the tasks", err);
      });
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

  deleteHandler = (e, id) => {
    e.preventDefault();
    fetch(`https://dashclick.herokuapp.com/admin/deleteTask/${id}`, {
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
        makeToast("success", "Deleted Succesfully !!");
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => task._id !== id);
        this.setState({ tasks: tasks });
      })
      .catch((err) => makeToast("error", "Request Failed"));
  };

  printDate = (date) => {
    var d = new Date(date);
    return d.toDateString();
  };

  renderTasks = (tasks) => {
    return (
      <div className="row">
        <div
          className="card col-md-3 text-center"
          data-toggle="modal"
          data-target="#exampleModalLong"
          style={{ margin: "10px" }}
          onClick={() =>
            this.setState({
              graphOpen: false,
              editUserOpen: false,
              newUserOpen: true,
            })
          }
        >
          <div className="card-body text-center">
            <i style={{ fontSize: "150px" }} class="fa fa-plus-square"></i>
          </div>
        </div>
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
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  onClick={() => this.showWorkingHour(task._id)}
                >
                  Working Hours <i class="fa fa-calendar"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(e) => this.deleteHandler(e, task._id)}
                >
                  Delete
                </button>
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
                    onClick={() => this.updateTasksHandler()}
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
                    onClick={() => this.updateTasksHandler()}
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
        </div>
      </>
    );
  }
}

export default Tasks;
