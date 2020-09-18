import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
    fetch(
      `https://dashclick.herokuapp.com/admin/getTask/${this.props.match.params.taskId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
      })
      .catch((err) => {
        console.log("Error in Getting all the users", err);
      });

    fetch(`https://dashclick.herokuapp.com/admin/getAllUsers`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
          return;
        }
        this.setState({ users: data.user });
      })
      .catch((err) => {
        console.log("Error in Getting all the users", err);
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

    fetch(
      `https://dashclick.herokuapp.com/admin/addUser/${this.state.taskId}/${data}`,
      {
        method: "PUT",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          return;
        }
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log("Error in droping", err);
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
            <h3>{this.state.name}</h3>
            <p>{this.state.description}</p>
            <h5>{this.printDate(this.state.dueDate)}</h5>
            <h6>Sub Tasks</h6>
            <ul>{subTask}</ul>
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
        <div className="col-4">
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
