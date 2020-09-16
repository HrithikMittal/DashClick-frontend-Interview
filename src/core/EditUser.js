import React, {Component} from "react";

class EditUser extends Component {
  state = {
    email : "",
    name: "",
    designation: "",
    workingHours: {},
  };

  handleChange = (name) => (event) => {
    this.setState({error : ""});
    this.setState({[name] : event.target.value});
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
        start : time1,
        end : time8,
      };
      obj["monday"] = time;
    }
    if (document.getElementById("Check2").checked) {
      let time = {
        start : time2,
        end : time9,
      };
      obj["tuesday"] = time;
    }
    if (document.getElementById("Check3").checked) {
      let time = {
        start : time3,
        end : time10,
      };
      obj["wednesday"] = time;
    }
    if (document.getElementById("Check4").checked) {
      let time = {
        start : time4,
        end : time11,
      };
      obj["thursday"] = time;
    }
    if (document.getElementById("Check5").checked) {
      let time = {
        start : time5,
        end : time12,
      };
      obj["friday"] = time;
    }
    if (document.getElementById("Check6").checked) {
      let time = {
        start : time6,
        end : time13,
      };
      obj["saturday"] = time;
    }
    if (document.getElementById("Check7").checked) {
      let time = {
        start : time7,
        end : time14,
      };
      obj["sunday"] = time;
    }
    var user = this.state;
    user.workingHours = obj;
    fetch(
        `https://dashclick.herokuapp.com/admin/updateUser/${this.props.userId}`,
        {
          method : "PUT",
          headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(user),
        })
        .then((response) => { return response.json(); })
        .then((data) => {
          if (data.error) {
            this.setState({
              designation : "",
              name : "",
              email : "",
              error : data.error,
            });
            return;
          }
          this.setState({
            error : "",
            workingHours : {},
            designation : "",
            name : "",
            email : "",
          });
        })
        .catch((err) => { console.log("Error in updating User!"); });
  };

  componentDidUpdate() {
    fetch(`https://dashclick.herokuapp.com/admin/getUser/${this.props.userId}`,
          {
            method : "GET",
            headers : {
              Accept : "application/json",
              "Content-Type" : "application/json",
            },
          })
        .then((response) => { return response.json(); })
        .then((data) => {
          this.setState({
            email : data.email,
            name : data.name,
            designation : data.designation,
          });
          console.log(data);
        })
        .catch((err) => { console.log("Error in getting User!"); });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={this.state.email}
              readOnly
            />
            <small id="emailHelp" className="form-text text-muted">
              sorry, you can't change email for a profile!
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
    type = "text"
    className = "form-control"
    value = {this.state.designation} onChange = {this.handleChange(
        "designation")} placeholder =
        "Designation" / >
        </div>
          <div className="form-group">
            <label>Working Hours</label>
        <div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check1" />
        <label className = "form-check-label">Monday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time1" type="time" /><
        label
    className = "form-check-label"
    style =
        {{ margin: "0px 10px" }} > to<input style =
                                      {
                                        { marginLeft: "10px" }
                                      } id = "timem" type = "time" />
        </label>
            </div><div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check2" />
        <label className = "form-check-label">Tuesday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time2" type="time" /><
        label
    className = "form-check-label"
    style =
        {{ margin: "0px 10px" }} > to<input style =
                                      {
                                        { marginLeft: "10px" }
                                      } id = "timetu" type = "time" />
        </label>
            </div><div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check3" />
        <label className = "form-check-label">Wednesday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time3" type="time" /><
        label
    className = "form-check-label"
    style =
        {{ margin: "0px 10px" }} > to<input style =
                                      {
                                        { marginLeft: "10px" }
                                      } id = "timew" type = "time" />
        </label>
            </div><div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check4" />
        <label className = "form-check-label">Thursday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time4" type="time" /><
        label
    className = "form-check-label"
    style =
        {{ margin: "0px 10px" }} > to<input style =
                                      {
                                        { marginLeft: "10px" }
                                      } id = "timeth" type = "time" />
        </label>
            </div><div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check5" />
        <label className = "form-check-label">Friday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time5" type="time" /><
        label
    className = "form-check-label"
    style =
        {{ margin: "0px 10px" }} > to<input style =
                                      {
                                        { marginLeft: "10px" }
                                      } id = "timef" type = "time" />
        </label>
            </div><div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check6" />
        <label className = "form-check-label">Saturday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time6" type="time" /><
        label
    className = "form-check-label"
    style =
        {{ margin: "0px 10px" }} > to<input style =
                                      {
                                        { marginLeft: "10px" }
                                      } id = "timesa" type = "time" />
        </label>
            </div><div className = "form-check">
        <input type = "checkbox" className = "form-check-input" id = "Check7" />
        <label className = "form-check-label">Sunday<
            /label>
              <input style={{ marginLeft: "10px" }} id="time7" type="time" /><
        label
    className = "form-check-label"
                style={{
      margin: "0px 10px" }}
              >
                to
                <input style={
      { marginLeft: "10px" }} id="timesu" type="time" />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.createUser}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditUser;
