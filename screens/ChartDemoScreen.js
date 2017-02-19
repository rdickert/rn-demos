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

class ChartDemoScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Chart here</Text>
        <ColorScale width="400" />
        <SvgExample />
      </View>
    )
  }
}

export default ChartDemoScreen;
