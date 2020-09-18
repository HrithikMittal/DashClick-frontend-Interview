import React, { Component } from "react";
import "./UserTask.scss";

class UserTask extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    fetch(
      `https://dashclick.herokuapp.com/admin/getUser/${this.props.match.params.userId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ tasks: data.tasks });
      })
      .catch((err) => {
        console.log("Error");
      });
  }

  printDate = (date) => {
    var d = new Date(date);
    return d.toDateString();
  };

  render() {
    var data = this.state.tasks.map((task, i) => {
      return (
        <li>
          <b>Name: </b>
          {task.name} <br />
          <b> Description: </b>
          {task.description} <br />
          <b>SubTasks:</b> {task.subtasks.join(",")} <br />
          <b>Due Date:</b> {this.printDate(task.dueDate)}
        </li>
      );
    });
    return (
      <main style={{ overflow: "scroll", height: "1000px" }}>
        <ol className="gradient-list">{data}</ol>
      </main>
    );
  }
}

export default UserTask;
