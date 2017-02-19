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

import * as d3 from "d3";

// edited from https://codepen.io/swizec/pen/oYNvpQ
// Edits: had to edit from fill being inside style to being its own thing
// Put colors/width into constructor (or could change babel)
// SVG components start with capital letters

// Component that draws a single color swatch
const Swatch = ({ color, width, x }) => (
  <Rect width={width} height="80%" x={x} y="0" fill={color} />
);

// Draws an entire color scale
class ColorScale extends Component {
  constructor() {
    super()
    this.colors = d3.schemeCategory20;
    this.width = d3.scaleBand()
              .domain(d3.range(20));
  }

  componentWillMount() {
    this.updateD3(this.props);
  }

  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.width.range([0, props.width]);
  }

  render() {
    // console.log('yAxis', yAxis);
    return (
      <Svg width="600" height="70" id="svg">
        <G>
          {d3.range(20).map(i => (
            <Swatch
              color={this.colors[i]}
              width={this.width.step()}
              x={this.width(i)}
              key={i}
            />
          ))}
        </G>
      </Svg>
    )
  }
}

export default ColorScale;
