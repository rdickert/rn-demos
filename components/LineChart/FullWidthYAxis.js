import React, { PropTypes } from 'react';
import {
  Dimensions,
} from 'react-native';

import {
  G,
  Text,
  Line,
} from 'react-native-svg';


// Renders a y-axis with values on the left and scale lines that run across the entire plot.
// Expexts an axis object that specifies the printable value of each 'tick' and the plot
// coordinate for the y-axis.
// XXX magic numbers to match numbers in the plot
const FullWidthYAxis = (props) => {
  const {
    axis,
    width = Dimensions.get('window').width,
    leftPad = 35,
    rightPad = 0,
    stroke = '#2F95DC',
    strokeWidth = 1,
  } = props;
  return (
    <G>
      {axis.map(({ value, plot }) => (
        <G key={`y-${value}`}>
          <Text
            x="10"
            y={plot - 5}
          >
            {value}
          </Text>
          <Line
            x1={leftPad}
            y1={plot + 5}
            x2={width + leftPad - rightPad}
            y2={plot + 5}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </G>
      ))}
    </G>
  );
};

FullWidthYAxis.propTypes = {
  axis: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    plot: PropTypes.number.isRequired,
  })),
  width: PropTypes.number,
  leftPad: PropTypes.number,
  rightPad: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default FullWidthYAxis;
