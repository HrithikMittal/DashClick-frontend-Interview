import React, { Component } from "react";
import { Link } from "react-router-dom";

import makeToast from "../../components/Toaster";
import Graph from "../graph/Graph";
import AddTask from "./AddTasks";
import EditTask from "./EditTask";

import "./Tasks.css";

class Tasks extends Component {
  state = {
    name: "",
    description: "",
    dueDate: "",
    subtasks: [],
    workingHours: {},
    tasks: [],
    taskId: "",
    graphOpen: false,
    newTaskOpen: false,
    editTaskOpen: false,
    user: "",
  };

  showWorkingHour = (id) => {
    this.setState({ graphOpen: true, newTaskOpen: false, editTaskOpen: false });
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i]._id === id) {
        this.setState({ workingHours: this.state.tasks[i].workingHours });
        break;
      }
    }
  };

  updateTasksHandler = () => {
    fetch(`https://dashclick.herokuapp.com/admin/getAllTasks`, {
      method: "GET",
    })
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
    fetch("https://dashclick.herokuapp.com/admin/getAllTasks", {
      method: "GET",
    })
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

  editTask = (e, task) => {
    this.showWorkingHour(task._id);
    this.setState({
      taskId: task._id,
      graphOpen: false,
      newTaskOpen: false,
      editTaskOpen: true,
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      subtasks: task.subtasks,
      user: task.user,
    });
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
              editTaskOpen: false,
              newTaskOpen: true,
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
              className="card col-md-5"
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
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  onClick={() => this.showWorkingHour(task._id)}
                >
                  Working Hours <i className="fa fa-calendar"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  onClick={(e) => {
                    this.editTask(e, task);
                  }}
                >
                  Edit <i className="fa fa-edit"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(e) => this.deleteHandler(e, task._id)}
                >
                  Delete <i class="fa fa-trash"></i>
                </button>
                <div className="text-right">
                  {task.user !== undefined ? (
                    <h5>{task.user.name}</h5>
                  ) : (
                    <Link to={address}>
                      <button type="button" class="btn btn-primary">
                        Assign User
                      </button>
                    </Link>
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
                    <Graph timing={this.state.workingHours} />
                  )}
                  {this.state.editTaskOpen && (
                    <EditTask
                      name={this.state.name}
                      description={this.state.description}
                      dueDate={this.state.dueDate}
                      subtasks={this.state.subtasks}
                      user={this.state.user}
                      workingHours={this.state.workingHours}
                      taskId={this.state.taskId}
                    />
                  )}
                  {this.state.newTaskOpen && <AddTask />}
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
          <div style={{ overflow: "auto", height: "800px" }}>
            {this.renderTasks(this.state.tasks)}
          </div>
        </div>
      </>
    );
  }
}

export default Tasks;
