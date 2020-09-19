import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAllUsers, assignTask, getTask } from "../../auth";

class AssignTask extends Component {
  state = {
    users: [],
    error: "",
    taskId: "",
    subtasks: [],
    dueDate: "",
    name: "",
    description: "",
    workingHours: {},
    redirect: false,
  };

  componentDidMount() {
    this.setState({ taskId: this.props.match.params.taskId });
    getTask(this.props.match.params.taskId).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        return;
      }
      this.setState({
        name: data.name,
        description: data.description,
        dueDate: data.dueDate,
        workingHours: data.workingHours,
        subtasks: data.subtasks,
      });
    });

    getAllUsers().then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
        return;
      }
      this.setState({ users: data.user });
    });
  }

  renderUser = (users) => {
    console.log(users);
    users.map((user, i) => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      );
    });
  };

  printDate = (date) => {
    var d = new Date(date);
    return d.toDateString();
  };

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    assignTask(this.state.taskId, data).then((data) => {
      console.log(data);
      if (data.error) {
        return;
      }
      this.setState({ redirect: true });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/tasks"></Redirect>;
    }

    var data = this.state.users.map((user, i) => {
      const dynamicId = user._id;
      return (
        <tr
          key={user._id}
          draggable="true"
          onDragStart={(e) => this.drag(e)}
          id={dynamicId}
        >
          <td className={dynamicId}>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      );
    });

    var subTask = this.state.subtasks.map((task, i) => {
      return <li>{task}</li>;
    });

    return (
      <div className="row" style={{ paddingTop: "50px" }}>
        <div className="col-1"></div>
        <div className="col-7">
          <div className="container-fluid">
            <h3>Assign User to the Task</h3>
            <h5>
              <b>Name:</b>
              {this.state.name}
            </h5>
            <h5>
              <b>Description:</b>
              {this.state.description}
            </h5>
            <h5>
              <b>Due Date:</b>
              {this.printDate(this.state.dueDate)}
            </h5>
            <h5>
              <b>Sub Tasks:</b>
            </h5>
            <h6>
              <ul>{subTask}</ul>
            </h6>
            <div
              class="alert alert-info"
              role="alert"
              style={{ marginTop: "50px" }}
            >
              Please drag a div of user which you want to assign and drop inside
              below box and you are done!
            </div>
            <div
              id="div1"
              onDrop={(e) => this.drop(e)}
              onDragOver={(e) => this.allowDrop(e)}
              style={{
                width: "550px",
                height: "70px",
                padding: "10px",
                border: "1px solid #aaaaaa",
              }}
            ></div>
          </div>
        </div>

        <div className="col-4" style={{ overflow: "scroll", height: "800px" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <b>Name</b>
                </th>
                <th scope="col">
                  <b>Email</b>
                </th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AssignTask;
