import React, { Component } from "react";
import { editTask, removeUser } from "../../auth";

import makeToast from "../../components/Toaster";
import "./EditTask.css";

class EditTask extends Component {
  state = {
    name: this.props.name,
    description: this.props.description,
    dueDate: this.props.dueDate,
    subtasks: this.props.subtasks.join(","),
    user: this.props.user,
    workingHours: this.props.workingHours,
    success: false,
    error: "",
  };

  componentDidMount() {
    this.setState({
      name: this.props.name,
      description: this.props.description,
      dueDate: this.props.dueDate,
      subtasks: this.props.subtasks.join(","),
      user: this.props.user,
      workingHours: this.props.workingHours,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "", success: false });
    this.setState({ [name]: event.target.value });
  };

  changeTime = (time1) => {
    let m1 = parseInt(time1[0] + time1[1]);
    let m2 = parseInt(time1[3] + time1[4]);
    let time = m1 + m2 / 100;
    return time;
  };

  createTask = (e) => {
    e.preventDefault();
    var obj = {};
    var time1 = this.changeTime(document.getElementById("time1").value);
    var time2 = this.changeTime(document.getElementById("time2").value);
    var time3 = this.changeTime(document.getElementById("time3").value);
    var time4 = this.changeTime(document.getElementById("time4").value);
    var time5 = this.changeTime(document.getElementById("time5").value);
    var time6 = this.changeTime(document.getElementById("time6").value);
    var time7 = this.changeTime(document.getElementById("time7").value);
    var time8 = this.changeTime(document.getElementById("timem").value);
    var time9 = this.changeTime(document.getElementById("timetu").value);
    var time10 = this.changeTime(document.getElementById("timew").value);
    var time11 = this.changeTime(document.getElementById("timeth").value);
    var time12 = this.changeTime(document.getElementById("timef").value);
    var time13 = this.changeTime(document.getElementById("timesa").value);
    var time14 = this.changeTime(document.getElementById("timesu").value);

    if (document.getElementById("Check1").checked) {
      let time = {
        start: time1,
        end: time8,
      };
      obj["monday"] = time;
    }
    if (document.getElementById("Check2").checked) {
      let time = {
        start: time2,
        end: time9,
      };
      obj["tuesday"] = time;
    }
    if (document.getElementById("Check3").checked) {
      let time = {
        start: time3,
        end: time10,
      };
      obj["wednesday"] = time;
    }
    if (document.getElementById("Check4").checked) {
      let time = {
        start: time4,
        end: time11,
      };
      obj["thursday"] = time;
    }
    if (document.getElementById("Check5").checked) {
      let time = {
        start: time5,
        end: time12,
      };
      obj["friday"] = time;
    }
    if (document.getElementById("Check6").checked) {
      let time = {
        start: time6,
        end: time13,
      };
      obj["saturday"] = time;
    }
    if (document.getElementById("Check7").checked) {
      let time = {
        start: time7,
        end: time14,
      };
      obj["sunday"] = time;
    }
    var task = {};
    task["name"] = this.state.name;
    task["description"] = this.state.description;
    task["dueDate"] = this.state.dueDate;
    task["subtasks"] = this.state.subtasks.split(",");
    if (this.state.user === undefined) {
      task["user"] = undefined;
    }
    if (Object.keys(obj).length !== 0) {
      var time = this.props.workingHours;
      console.log(obj);
      if (obj.monday !== undefined) {
        time["monday"] = obj["monday"];
      }
      if (obj.tuesday !== undefined) {
        time["tueday"] = obj["tueday"];
      }
      if (obj.wednesday !== undefined) {
        time["wednesday"] = obj["wednesday"];
      }
      if (obj.thursday !== undefined) {
        time["thursday"] = obj["thursday"];
      }
      if (obj.friday !== undefined) {
        time["friday"] = obj["friday"];
      }
      if (obj.saturday !== undefined) {
        time["saturday"] = obj["saturday"];
      }
      task.workingHours = time;
    }

    editTask(this.props.taskId).then((data) => {
      if (data.error) {
        this.setState({
          error: data.error,
          success: false,
        });
        return;
      }
      this.setState({
        success: true,
      });
    });
  };

  deleteHandler = (e, id) => {
    e.preventDefault();
    this.setState({ user: undefined });
    removeUser(id)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.error) {
          makeToast("error", "Request Failed");
          return;
        }
        makeToast("success", "Deleted Succesfully !!");
      });
  };

  render() {
    if (this.props.description !== this.state.description) {
      this.setState({
        name: this.props.name,
        description: this.props.description,
        dueDate: this.props.dueDate,
        subtasks: this.props.subtasks.join(","),
        user: this.props.user,
      });
    }
    return (
      <div className="container">
        <h2 className="mt-2 mb-3">Edit Task</h2>

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        {this.state.success && (
          <div
            className="alert alert-success"
            style={{ display: this.state.success ? "" : "none" }}
          >
            Your task updated successfully!
          </div>
        )}
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={this.props.name}
              readOnly
            />
            <small id="emailHelp" className="form-text text-muted">
              Please create new one if you want to chnage name
            </small>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.handleChange("description")}
              placeholder="description"
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              value={this.state.dueDate}
              onChange={this.handleChange("dueDate")}
              placeholder="dueDate"
            />
          </div>
          <div className="form-group">
            <label>Sub Tasks</label>
            <input
              type="text"
              className="form-control"
              value={this.state.subtasks}
              onChange={this.handleChange("subtasks")}
              placeholder="subtasks"
            />
          </div>
          <div className="form-group">
            <label>
              User
              <i
                className="fa fa-times-circle"
                style={{ display: this.state.user ? "" : "none" }}
                onClick={(e) => this.deleteHandler(e, this.props.taskId)}
              ></i>
            </label>
            {this.state.user && (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.user.name}
                  onChange={this.handleChange("user")}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="form-group">
            <label>Working Hours</label>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check1"
              />
              <label className="form-check-label">Monday</label>
              <input
                style={{ marginLeft: "80px" }}
                id="time1"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timem"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check2"
              />
              <label className="form-check-label">Tuesday</label>
              <input
                style={{ marginLeft: "76px" }}
                id="time2"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timetu"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check3"
              />
              <label className="form-check-label">Wednesday</label>
              <input
                style={{ marginLeft: "52px" }}
                id="time3"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timew"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check4"
              />
              <label className="form-check-label">Thursday</label>
              <input
                style={{ marginLeft: "70px" }}
                id="time4"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timeth"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check5"
              />
              <label className="form-check-label">Friday</label>
              <input
                style={{ marginLeft: "92px" }}
                id="time5"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timef"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check6"
              />
              <label className="form-check-label">Saturday</label>
              <input
                style={{ marginLeft: "72px" }}
                id="time6"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timesa"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
            <div className="form-check">
              <input
                style={{ marginTop: "12px", cursor: "pointer" }}
                type="checkbox"
                className="form-check-input"
                id="Check7"
              />
              <label className="form-check-label">Sunday</label>
              <input
                style={{ marginLeft: "82px" }}
                id="time7"
                type="time"
                value="09:00"
              />
              <label
                className="form-check-label"
                style={{ margin: "5px 10px" }}
              >
                to
                <input
                  style={{ marginLeft: "10px" }}
                  id="timesu"
                  type="time"
                  value="18:00"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="submit_btn"
            onClick={this.createTask}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditTask;
