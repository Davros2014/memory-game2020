import React, { Fragment } from "react";

import "../styles/AnimatedCircle.css";

export default function AnimatedCircle({ timer, time }) {
  const radius = 50;
  const stroke = 6;
  // const time = 120;
  // radius minus the stoke width or it will overflow the svg wrapper
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // timer at current state in useEffect / time set by options multiplied for a percentage of 100
  let percentage = (timer / time) * 100;
  let progress = 100 - percentage;
  // console.log("progress", progress);
  let strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <Fragment>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke={`${timer <= 10 ? "red" : "white"}`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="rgba(270, 270, 270, 0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="rgba(270, 270, 270, 0.25)"
          strokeDasharray={1 + " " + 5}
          fill="transparent"
          strokeWidth="12"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </Fragment>
  );
}
