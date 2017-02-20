import React from 'react';

import {
  Dimensions,
} from 'react-native';

import Svg, { Path } from 'react-native-svg';

import {
  prop,
  pipe,
  head,
  last,
  pluck,
  replace,
} from 'ramda';

// catch-all d3 for now
import * as d3 from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';

// import { axisBottom } from 'd3-axis'
// conclusion: axis is unusable, as it must render dom elements. Just render your own

import PriceScale from './PriceScale';

// original data copied from the web
const data = [
  { dateTime: new Date(2007, 3, 24), price: 93.24 },
  { dateTime: new Date(2007, 3, 25), price: 95.35 },
  { dateTime: new Date(2007, 3, 26), price: 20.2 },
  { dateTime: new Date(2007, 3, 27), price: 30.5 },
  { dateTime: new Date(2007, 3, 28), price: 15.5 },
  { dateTime: new Date(2007, 3, 29), price: 22.5 },
  { dateTime: new Date(2007, 3, 30), price: 50.45 },
  { dateTime: new Date(2007, 4, 1), price: 38.2 },
  { dateTime: new Date(2007, 4, 2), price: 93.24 },
  { dateTime: new Date(2007, 4, 3), price: 95.35 },
  { dateTime: new Date(2007, 4, 4), price: 20.2 },
  { dateTime: new Date(2007, 4, 5), price: 22.5 },
  { dateTime: new Date(2007, 4, 6), price: 50.45 },
  { dateTime: new Date(2007, 4, 7), price: 38.2 },
  { dateTime: new Date(2007, 4, 8), price: 70.2 },
  { dateTime: new Date(2007, 4, 9), price: 65.2 },
  { dateTime: new Date(2007, 4, 10), price: 90.2 },
];

// actual price data to learn scaling, etc.
const TslaPrices = [
  { price: 238.36, dateTime: new Date('Thu Jan 19 2017 21:59:00 GMT-0700 (MST)') },
  { price: 243.76, dateTime: new Date('Fri Jan 20 2017 21:59:00 GMT-0700 (MST)') },
  { price: 244.73, dateTime: new Date('Mon Jan 23 2017 21:59:00 GMT-0700 (MST)') },
  { price: 248.92, dateTime: new Date('Tue Jan 24 2017 21:59:00 GMT-0700 (MST)') },
  { price: 254.61, dateTime: new Date('Wed Jan 25 2017 21:59:00 GMT-0700 (MST)') },
  { price: 254.47, dateTime: new Date('Thu Jan 26 2017 21:59:00 GMT-0700 (MST)') },
  { price: 252.51, dateTime: new Date('Fri Jan 27 2017 21:59:00 GMT-0700 (MST)') },
  { price: 252.95, dateTime: new Date('Mon Jan 30 2017 21:59:00 GMT-0700 (MST)') },
  { price: 250.63, dateTime: new Date('Tue Jan 31 2017 21:59:00 GMT-0700 (MST)') },
  { price: 251.93, dateTime: new Date('Wed Feb 01 2017 21:59:00 GMT-0700 (MST)') },
  { price: 249.24, dateTime: new Date('Thu Feb 02 2017 21:59:00 GMT-0700 (MST)') },
  { price: 251.55, dateTime: new Date('Fri Feb 03 2017 21:59:00 GMT-0700 (MST)') },
  { price: 251.33, dateTime: new Date('Mon Feb 06 2017 21:59:00 GMT-0700 (MST)') },
  { price: 257.77, dateTime: new Date('Tue Feb 07 2017 21:59:00 GMT-0700 (MST)') },
  { price: 257.48, dateTime: new Date('Wed Feb 08 2017 21:59:00 GMT-0700 (MST)') },
  { price: 262.08, dateTime: new Date('Thu Feb 09 2017 21:59:00 GMT-0700 (MST)') },
  { price: 269.2, dateTime: new Date('Fri Feb 10 2017 21:59:00 GMT-0700 (MST)') },
  { price: 269.23, dateTime: new Date('Mon Feb 13 2017 21:59:00 GMT-0700 (MST)') },
  { price: 280.6, dateTime: new Date('Tue Feb 14 2017 21:59:00 GMT-0700 (MST)') },
  { price: 280.98, dateTime: new Date('Wed Feb 15 2017 21:59:00 GMT-0700 (MST)') },
  { price: 279.76, dateTime: new Date('Thu Feb 16 2017 21:59:00 GMT-0700 (MST)') },
  { price: 268.95, dateTime: new Date('Fri Feb 17 2017 21:59:00 GMT-0700 (MST)') },
];

// scale to screen size
const windowWidth = Dimensions.get('window').width;
const Y_SCALE_WIDTH = 50;
const ASPECT_RATIO = 0.7;
const CHART_PADDING_RIGHT = 20;
const plotWidth = windowWidth - Y_SCALE_WIDTH - CHART_PADDING_RIGHT;
const plotHeight = plotWidth * ASPECT_RATIO;


// set up data plot
const timeSeries = data;
const prices = pluck('price', timeSeries);
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);

const y = scaleLinear()
  .domain([minPrice, maxPrice])    // values between 0 and 100
  // REMEMBER: y axis range has the bigger number first because the y value of
  // zero is at the top of chart and increases as you go down.
  .range([plotHeight, 0]);   // map these to the chart height, less padding.


const startDateTime = pipe(head, prop('dateTime'))(timeSeries);
const endDateTime = pipe(last, prop('dateTime'))(timeSeries);
// const last = timeSeries[]
const x = scaleTime()
    .domain([startDateTime, endDateTime])
    .range([0, plotWidth]);


// for curve smoothing, try curveLinear (no smoothing, default) and curveMonotoneX
// See https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
const generateLine = d3.line()
  // .curve(d3.curveMonotoneX)
  .x(d => x(d.dateTime))
  .y(d => y(d.price));

const plotLine = pipe(generateLine, replace(/[,]/g, ' '));

// console.log('plotLine', plotLine(timeSeries));

// XXX a couple of magic numbers in here that should be parameterized
const LineChart = () => {
  return (
    <Svg width={windowWidth} height={plotHeight + 10} id="svg">
      <PriceScale
        timeSeries={timeSeries}
        scale={y}
      />
      <Path
        x={Y_SCALE_WIDTH}
        y="5"
        d={plotLine(timeSeries)}
        fill="none"
        stroke="#888"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
    </Svg>
  );
};

export default LineChart;
