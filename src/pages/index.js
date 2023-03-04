import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

const _ = require("lodash");


export default function Home(){
  const [score, setScore] = useState(0);
  const lowerBound = 20, upperBound = 80;
  console.log(upperBound);

  const normalY = (x, mean, stdDev) =>
    Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) * 100000;

  const getMean = (lowerBound, upperBound) => (upperBound + lowerBound) / 2;

  // distance between mean and each bound of a 95% confidence interval
  // is 2 stdDeviation, so distance between the bounds is 4
  const getStdDeviation = (lowerBound, upperBound) =>
    (upperBound - lowerBound) / 4;

  const generatePoints = (lowerBound, upperBound) => {
    let stdDev = getStdDeviation(lowerBound, upperBound);
    let min = lowerBound - 2 * stdDev;
    let max = upperBound + 2 * stdDev;
    let unit = (max - min) / 100;
    return _.range(min, max, unit);
  };

  let mean = getMean(lowerBound, upperBound);
  let stdDev = getStdDeviation(lowerBound, upperBound);
  let points = generatePoints(lowerBound, upperBound);

  let seriesData = points.map((x) => ({ x, y: normalY(x, mean, stdDev) }));
  var color = "red";
  score<=35? (color = "red"):(score<=75? (color = "orange"): (color = "green"));
  const options = {
    chart: {
      type: "area",
      height: 300,
      width: 510,
    },
    title: {
      text: "Your Score",
      y: 200,
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: "",
    },
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: seriesData,
      },
    ],
    plotOptions: {
      series: {
        lineWidth: 0,
      },
      area: {
        enableMouseTracking: false,
        color: "rgb(226, 119, 122)",
        fillColor: "rgba(226, 119, 122, 0.5)",
        zoneAxis: "x",
        zones: [
          {
            //fillColor gets the inside of the graph, color would change the lines
            fillColor: color,
            // everything below this value has this style applied to it
            value: score,
          },

          {
            fillColor: "RGB(208 207 211)",
          },
        ],
      },
    },
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <div
            style={{ textAlign: "center", fontSize: "40px", color: `${color}` }}
          >
            {score}
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "196px",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "196px",
                  backgroundColor: "red",
                }}
              ></div>
              <div style={{ textAlign: "center" }}>Needs Work</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "164px",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "164px",
                  backgroundColor: "orange",
                }}
              ></div>
              <div style={{ textAlign: "center" }}>On track</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "150px",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "150px",
                  backgroundColor: "green",
                }}
              ></div>
              <div style={{ textAlign: "center" }}>Good job</div>
            </div>
          </div>
        </div>

        <div>
          <input
            type="text"
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter your score here"
            style={{ padding: "5px", margin: "10px" }}
          />
        </div>
      </div>
    </>
  );
}
