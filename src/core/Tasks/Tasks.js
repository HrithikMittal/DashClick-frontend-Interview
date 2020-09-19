import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteTask, getAllTasks } from "../../auth";

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
    getAllTasks().then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        return;
      }
      this.setState({ tasks: data.tasks });
    });
  };

  componentDidMount() {
    getAllTasks().then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        return;
      }
      this.setState({ tasks: data.tasks });
    });
  }

  deleteHandler = (e, id) => {
    e.preventDefault();
    deleteTask(id).then((res) => {
      if (res.error) {
        makeToast("error", "Request Failed");
        return;
      }
      makeToast("success", "Deleted Succesfully !!");
      let tasks = [...this.state.tasks];
      tasks = tasks.filter((task) => task._id !== id);
      this.setState({ tasks: tasks });
    });
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
            <i
              style={{ fontSize: "150px", color: "lightblue" }}
              className="fa fa-plus-square"
            ></i>
            <div className="card-body">
              <h4 className="card-text">Add New Task</h4>
            </div>
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
                <p className="card-text">
                  <b>Due Date:</b>
                  {this.printDate(task.dueDate)}
                </p>

                <p>
                  <b>Description:</b>
                  {task.description}
                </p>
                <p>
                  <b>Sub Tasks:</b>
                  {task.subtasks.join(",")}
                </p>
                <button
                  type="button"
                  className="button-calender"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  onClick={() => this.showWorkingHour(task._id)}
                >
                  Working Hours <i className="fa fa-calendar"></i>
                </button>
                <button
                  type="button"
                  className="button-editTask"
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
                  className="button-delete"
                  onClick={(e) => this.deleteHandler(e, task._id)}
                >
                  Delete <i className="fa fa-trash"></i>
                </button>
                {console.log(task.user)}
                <div className="text-right">
                  {task.user !== "" &&
                  task.user !== null &&
                  task.user !== undefined ? (
                    <h5>{task.user.name}</h5>
                  ) : (
                    <Link to={address}>
                      <button type="button" className="btn btn-primary">
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
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.updateTasksHandler()}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
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
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
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
