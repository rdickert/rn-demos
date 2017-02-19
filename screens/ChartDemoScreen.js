// import Exponent from 'exponent';


import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import SvgExample from '../components/SvgExample';
import ColorScale from '../components/ColorScale';
import LineChart from '../components/LineChart';

class ChartDemoScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Chart here</Text>
        <ColorScale width="350" />
        <SvgExample />
        <LineChart />
      </View>
    )
  }
}

export default ChartDemoScreen;
