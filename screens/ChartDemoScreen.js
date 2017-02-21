import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import SvgExample from '../components/SvgExample';
import ColorScale from '../components/ColorScale';
import LineChart from '../components/LineChart';

import TSLA from '../data/TSLA';
import madeUpData from '../data/madeUpData';

const ChartDemoScreen = () => (
  <View>
    <Text>Chart here</Text>
    <ColorScale width="350" />
    <LineChart
      timeSeries={
        /* use TSLA or madeUpData */
        madeUpData
      }
      aspectRatio={0.6}
      yScaleLeftRatio={0.12}
      chartPaddingRightRatio={0.05}
    />
  </View>
);

export default ChartDemoScreen;
