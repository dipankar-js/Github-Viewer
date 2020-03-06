import React, { useEffect, useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
import "../../App.css";
import GitContext from "../../context/gitContext";

const GhPolyglot = require("gh-polyglot");

// Repository stats
// me.repoStats(function(err, stats) {
//   console.log(err || stats);
// });

export default function Language() {
  const { github } = useContext(GitContext);
  const [state, setState] = useState({
    label: [],
    datas: [],
    color: []
  });

  useEffect(() => {
    let user = github.userId;
    let stats = new GhPolyglot(`${user}/giggle-ui`);
    const labelarray = [];
    const dataarray = [];
    const colorarray = [];
    // User stats
    stats.userStats(function(err, stats) {
      if (stats) {
        stats.map(stat => {
          labelarray.push(stat.label);
          dataarray.push(stat.value);
          colorarray.push(stat.color);
        });
      }
      setState({
        ...state,
        label: labelarray,
        datas: dataarray,
        color: colorarray
      });
    });
  }, [github]);

  const chartData = {
    labels: state.label,
    datasets: [
      {
        label: "Language",
        data: state.datas,
        backgroundColor: state.color
      }
    ]
  };
  return state.label.length > 0 ? (
    <div className="graph">
      <Pie
        data={chartData}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  stepSize: 1
                }
              }
            ]
          },
          title: {
            display: true,
            text: "Language used by Repository",
            fontSize: 25,
            fontFamily: "Stylish"
          },
          legend: {
            display: true,
            position: "top"
          }
        }}
      />
    </div>
  ) : null;
}
