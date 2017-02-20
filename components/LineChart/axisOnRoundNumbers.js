import {
  pluck,
  range,
} from 'ramda';

import { withProps } from 'recompose';

// A HOC to attach an axis array to an Axis display component
// Set up scale lines to always have them on round numbers.
const axisOnRoundNumbers = (timeSeries, scale, valueName = 'value') => {
  const values = pluck(valueName, timeSeries);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const chartSpread = (max - min);
  let linesAt = 1;

  // XXX very small and large values will look bad.
  // could make this valid for all values with a nicer algorithm.
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

  const axis = range(Math.ceil(min), Math.floor(max))
    .filter(value => value % linesAt === 0)
    .map(value => ({
      value,
      plot: scale(value),
    }));

  return withProps({ axis });
};

export default axisOnRoundNumbers;
