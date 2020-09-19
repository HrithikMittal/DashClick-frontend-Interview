import React, { Component } from "react";
import { getUser } from "../../auth";
import "./UserTask.scss";

class UserTask extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    getUser(this.props.match.params.userId).then((data) => {
      console.log(data);
      this.setState({ tasks: data.tasks });
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
        {this.state.tasks.length === 0 && (
          <ol className="gradient-list">
            <li>
              <b>Sorry, this is no Tasks for this user !!!</b>
            </li>
          </ol>
        )}
        <ol className="gradient-list">{data}</ol>
      </main>
    );
  }
}

export default UserTask;
