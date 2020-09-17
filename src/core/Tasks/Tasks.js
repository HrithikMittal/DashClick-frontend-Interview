import React, { Component } from "react";
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

  render() {
    return (
      <div className="user-lists">
        <div
          class="modal fade"
          id="exampleModalLong"
          // tabindex="-1"
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
        <div className="row">
          <button
            className="add_user_button"
            type="button"
            style={{ position: "absolute", right: 50, top: 30 }}
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
            Add Task
          </button>
        </div>
      </div>
    );
  }
}

export default Tasks;
