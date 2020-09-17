import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
  componentDidUpdate() {}
  render() {
    const { timing } = this.props;
    let baseVal = [
      { label: "Mon", y: [0, 0] },
      { label: "Tue", y: [0, 0] },
      { label: "Wed", y: [0, 0] },
      { label: "Thurs", y: [0, 0] },
      { label: "Fri", y: [0, 0] },
      { label: "Sat", y: [0, 0] },
      { label: "Sun", y: [0, 0] },
    ];
    if (timing.monday !== undefined) {
      baseVal.map((ele) => {
        if (ele.label === "Mon") {
          ele.y[0] = timing.monday.start;
          ele.y[1] = timing.monday.end;
          return 1;
        }
      });
    }
    if (timing.tuesday) {
      baseVal.map((ele) => {
        if (ele.label === "Tue") {
          ele.y[0] = timing.tuesday.start;
          ele.y[1] = timing.tuesday.end;
          return 1;
        }
      });
    }
    if (timing.wednesday) {
      baseVal.map((ele) => {
        if (ele.label === "Wed") {
          ele.y[0] = timing.wednesday.start;
          ele.y[1] = timing.wednesday.end;
          return 1;
        }
      });
    }
    if (timing.thursday) {
      baseVal.map((ele) => {
        if (ele.label === "Thurs") {
          ele.y[0] = timing.thursday.start;
          ele.y[1] = timing.thursday.end;
        }
      });
    }
    if (timing.friday) {
      baseVal.map((ele) => {
        if (ele.label === "Fri") {
          ele.y[0] = timing.friday.start;
          ele.y[1] = timing.friday.end;
        }
      });
    }
    if (timing.saturday) {
      baseVal.map((ele) => {
        if (ele.label === "Sat") {
          ele.y[0] = timing.saturday.start;
          ele.y[1] = timing.saturday.end;
        }
      });
    }
    if (timing.sunday) {
      baseVal.map((ele) => {
        if (ele.label === "Sun") {
          ele.y[0] = timing.sunday.start;
          ele.y[1] = timing.sunday.end;
        }
      });
    }

    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Working Hours",
      },
      axisY: {
        title: "Time (in 24 hours)",
      },
      data: [
        {
          type: "rangeArea",
          xValueFormatString: "string",
          yValueFormatString: "#0.## hr",
          toolTipContent:
            ' <span style="color:#6D78AD">{label}</span><br><b>Start:</b> {y[0]}<br><b>End:</b> {y[1]}',
          dataPoints: baseVal,
        },
      ],
    };
    return (
      <div className="modal-body">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
export default Graph;
