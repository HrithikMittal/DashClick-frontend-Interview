import React, { Component } from "react";
import "./AddUser.css";

class AddUser extends Component {
  state = {
    email: "",
    name: "",
    designation: "",
    workingHours: {},
    success: false,
    error: "",
  };

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

  createUser = (e) => {
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
    var user = this.state;
    if (Object.keys(obj).length === 0) {
      obj["monday"] = { start: 0, end: 0 };
    }
    user.workingHours = obj;
    fetch(`https://dashclick.herokuapp.com/admin/createUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState({
            designation: "",
            name: "",
            email: "",
            error: data.error,
          });
          return;
        }
        this.setState({
          error: "",
          workingHours: {},
          designation: "",
          name: "",
          email: "",
          success: true,
        });
      })
      .catch((err) => {
        console.log("Error in creating User!");
      });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-2 mb-3">Sign In</h2>

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
            Your account created successfully!
          </div>
        )}
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={this.state.email}
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange("name")}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={this.state.designation}
              onChange={this.handleChange("designation")}
              placeholder="Designation"
            />
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
                type="time"
                style={{ marginLeft: "52px" }}
                id="time3"
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
            onClick={this.createUser}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddUser;
