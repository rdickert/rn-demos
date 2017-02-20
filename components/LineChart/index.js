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
} from 'ramda';

import { compose, withProps } from 'recompose';

// catch-all d3 for now
import * as d3 from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';

import FullWidthYAxis from './FullWidthYAxis';
import axisOnRoundNumbers from './axisOnRoundNumbers';

const getYScale = (timeSeries, plotHeight) => {
  const prices = pluck('price', timeSeries);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  return scaleLinear()
    .domain([minPrice, maxPrice])    // values between 0 and 100
    // REMEMBER: y axis range has the bigger number first because the y value of
    // zero is at the top of chart and increases as you go down.
    .range([plotHeight, 0]);   // map these to the chart height, less padding.
};

const getXScale = (timeSeries, plotWidth) => {
  const startDateTime = pipe(head, prop('dateTime'))(timeSeries);
  const endDateTime = pipe(last, prop('dateTime'))(timeSeries);
  return scaleTime()
    .domain([startDateTime, endDateTime])
    .range([0, plotWidth]);
};

const pathD = (timeSeries, x, y) => {
  // HOC to generate the path d for the data line
  // for curve smoothing, try curveLinear (no smoothing, default) and curveMonotoneX
  // See https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
  const generateSvgPath = d3.line()
    // .curve(d3.curveMonotoneX)
    .x(d => x(d.dateTime))
    .y(d => y(d.price));
  // d3 returns comma-separated values, but we need spaces
  const generateRnSvgPath = generateSvgPath(timeSeries).replace(/[,]/g, ' ');
  return withProps({ d: generateRnSvgPath });
};

const LineChart = (props) => {
  const {
    timeSeries,
    width = Dimensions.get('window').width,
    aspectRatio = 0.7,
    yScaleLeftRatio = 0.12,
    chartPaddingRightRatio = 0.05,
  } = props;

  // Set up chart layout
  const scaleWidth = value => value * width;
  const yScaleLeftPad = scaleWidth(yScaleLeftRatio);
  const chartPaddingRight = scaleWidth(chartPaddingRightRatio);
  const plotWidth = width - yScaleLeftPad - chartPaddingRight;
  const plotHeight = plotWidth * aspectRatio;

  // configure scale functions (translate data scale to chart pixel scale)
  const y = getYScale(timeSeries, plotHeight);
  const x = getXScale(timeSeries, plotWidth);

  // Assemble display components
  const YAxis = compose(
    axisOnRoundNumbers(timeSeries, y, 'price')
  )(FullWidthYAxis);

  const Plot = compose(
    pathD(timeSeries, x, y)
  )(Path);

  // XXX a couple of magic numbers in here that should be parameterized
  return (
    <Svg
      width={width}
      height={plotHeight * 1.1
        /* expand slightly to allow for line edges at top & bottom */
      }
    >
      <YAxis
        strokeWidth={0.5}
        width={width}
        rightPad={45}
      />
      <Plot
        x={yScaleLeftPad}
        y="5"
        fill="none"
        stroke="#888"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
    </Svg>
  );
};

export default LineChart;
