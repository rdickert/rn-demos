import React, { Component } from 'react';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

// catch-all d3 for now
import * as d3 from "d3";


import { scaleLinear, scaleTime } from 'd3-scale';

// import { axisBottom } from 'd3-axis'
// conclusion: axis is unusable, as it must render dom elements. Just render your own

const y = scaleLinear()
  .domain([20, 100])    // values between 0 and 100
  .range([100, 0]);   // map these to the chart height, less padding.
//                //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.

var x = scaleTime()
    .domain([new Date(2007, 3, 24), new Date(2007, 4,  10)])
    .range([0, 350]);

// original data copied from the web
var data = [
  {dateTime: new Date(2007, 3, 24), price: 93.24},
  {dateTime: new Date(2007, 3, 25), price: 95.35},
  {dateTime: new Date(2007, 3, 26), price: 20.2},
  {dateTime: new Date(2007, 3, 27), price: 30.5},
  {dateTime: new Date(2007, 3, 28), price: 15.5},
  {dateTime: new Date(2007, 3, 29), price: 22.5},
  {dateTime: new Date(2007, 3, 30), price: 50.45},
  {dateTime: new Date(2007, 4, 1), price: 38.2},
  {dateTime: new Date(2007, 4, 2), price: 93.24},
  {dateTime: new Date(2007, 4, 3), price: 95.35},
  {dateTime: new Date(2007, 4, 4), price: 20.2},
  {dateTime: new Date(2007, 4, 5), price: 22.5},
  {dateTime: new Date(2007, 4, 6), price: 50.45},
  {dateTime: new Date(2007, 4, 7), price: 38.2},
  {dateTime: new Date(2007, 4, 8), price: 70.2},
  {dateTime: new Date(2007, 4, 9), price: 65.2},
  {dateTime: new Date(2007, 4, 10), price: 90.2},
];

// actual price data to learn scaling, etc.
const TslaPrices = [
  { price: 268.95, dateTime: new Date("Fri Feb 17 2017 21:59:00 GMT-0700 (MST)") },
  { price: 279.76, dateTime: new Date("Thu Feb 16 2017 21:59:00 GMT-0700 (MST)") },
  { price: 280.98, dateTime: new Date("Wed Feb 15 2017 21:59:00 GMT-0700 (MST)") },
  { price: 280.6,  dateTime: new Date("Tue Feb 14 2017 21:59:00 GMT-0700 (MST)") },
  { price: 269.23, dateTime: new Date("Mon Feb 13 2017 21:59:00 GMT-0700 (MST)") },
  { price: 269.2,  dateTime: new Date("Fri Feb 10 2017 21:59:00 GMT-0700 (MST)") },
  { price: 262.08, dateTime: new Date("Thu Feb 09 2017 21:59:00 GMT-0700 (MST)") },
  { price: 257.48, dateTime: new Date("Wed Feb 08 2017 21:59:00 GMT-0700 (MST)") },
  { price: 257.77, dateTime: new Date("Tue Feb 07 2017 21:59:00 GMT-0700 (MST)") },
  { price: 251.33, dateTime: new Date("Mon Feb 06 2017 21:59:00 GMT-0700 (MST)") },
  { price: 251.55, dateTime: new Date("Fri Feb 03 2017 21:59:00 GMT-0700 (MST)") },
  { price: 249.24, dateTime: new Date("Thu Feb 02 2017 21:59:00 GMT-0700 (MST)") },
  { price: 251.93, dateTime: new Date("Wed Feb 01 2017 21:59:00 GMT-0700 (MST)") },
  { price: 250.63, dateTime: new Date("Tue Jan 31 2017 21:59:00 GMT-0700 (MST)") },
  { price: 252.95, dateTime: new Date("Mon Jan 30 2017 21:59:00 GMT-0700 (MST)") },
  { price: 252.51, dateTime: new Date("Fri Jan 27 2017 21:59:00 GMT-0700 (MST)") },
  { price: 254.47, dateTime: new Date("Thu Jan 26 2017 21:59:00 GMT-0700 (MST)") },
  { price: 254.61, dateTime: new Date("Wed Jan 25 2017 21:59:00 GMT-0700 (MST)") },
  { price: 248.92, dateTime: new Date("Tue Jan 24 2017 21:59:00 GMT-0700 (MST)") },
  { price: 244.73, dateTime: new Date("Mon Jan 23 2017 21:59:00 GMT-0700 (MST)") },
  { price: 243.76, dateTime: new Date("Fri Jan 20 2017 21:59:00 GMT-0700 (MST)") },
  { price: 238.36, dateTime: new Date("Thu Jan 19 2017 21:59:00 GMT-0700 (MST)") },
];

// for curve, try curveLinear and curveMonotoneX
// See https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
const chartLine = d3.line()
  // .curve(d3.curveMonotoneX)
  .curve(d3.curveLinear)
  .x(function(d) { return x(d.dateTime); })
  .y(function(d) { return y(d.price); });
// console.log('chartLine', chartLine(data).replace(/[,]/g, ' '));

const ScaleLine = ({ y }) => (
  <Line
      x1="30"
      y1={y}
      x2="600"
      y2={y}
      stroke="#2F95DC"
  />
);

const LineChart = () => {
  return (
    <Svg width="600" height="200" id="svg">
      <G>
        <ScaleLine y="20" />
        <ScaleLine y="50" />
        <ScaleLine y="80" />
      </G>
      <Path
          x="40"
          d={chartLine(data).replace(/[,]/g, ' ')}
          fill="none"
          stroke="#888"
          strokeWidth="2"
      />
    </Svg>
  )
}

export default LineChart
