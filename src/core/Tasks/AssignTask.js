import React, { Component } from "react";

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
          <td>Hi{user.name}</td>
          <td>{user.email}</td>
        </tr>
      );
    });
  };

  printDate = (date) => {
    var d = new Date(date);
    return d.toDateString();
  };

  render() {
    var data = this.state.users.map((user, i) => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
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
