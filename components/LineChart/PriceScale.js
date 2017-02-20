import React from 'react';
import {
  Dimensions,
} from 'react-native';

import {
  G,
  Text,
  Line,
} from 'react-native-svg';

import {
  pluck,
  range,
} from 'ramda';

const scaleLineSeries = (timeSeries, scale, valueName = 'value') => {
  // set up scale lines. Always have them on round number prices.

  const values = pluck(valueName, timeSeries);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const chartSpread = (max - min);
  let linesAt = 1;
  if (chartSpread > 160) {
    linesAt = 50;
  } else if (chartSpread > 80) {
    linesAt = 25;
  } else if (chartSpread > 65) {
    linesAt = 20;
  } else if (chartSpread > 35) {
    linesAt = 10;
  } else if (chartSpread > 18) {
    linesAt = 5;
  } else if (chartSpread > 7) {
    linesAt = 2;
  }

  return range(Math.ceil(min), Math.floor(max))
    .filter(value => value % linesAt === 0)
    .map(value => ({
      value,
      y: scale(value),
    }));
};

const PriceScale = (props) => {
  const {
    timeSeries,
    scale,
    width = Dimensions.get('window').width,
    leftPad = 10,
    rightPad = 0,
  } = props;
  return (
    <G>
      {scaleLineSeries(timeSeries, scale, 'price').map(({ value, y }) => (
        <G key={`y-${value}`}>
          <Text
            x="10"
            y={y - 8}
          >
            {value}
          </Text>
          <Line
            x1="35"
            y1={y}
            x2={width - leftPad - rightPad}
            y2={y}
            stroke="#2F95DC"
          />
        </G>
      ))}
    </G>
  );
};

export default PriceScale;
