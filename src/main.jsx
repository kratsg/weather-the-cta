import React from 'react';
import ReactDOM from 'react-dom';

// use createClass to get autobinding working, doesn't work in ES6
//      http://blog.andrewray.me/react-es6-autobinding-and-createclass/
var WeatherWidget = React.createClass({
  getInitialState: function() {
    return {seconds: 0};
  },
  componentWillMount: function() {
    this.interval = null;
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, this.props.delta);
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return <h1>Hello, {this.props.name}. I have been running for {this.state.seconds} seconds.</h1>
  }
});

WeatherWidget.defaultProps = {name: 'Giordon', delta: 1000};

ReactDOM.render(
  <WeatherWidget />,
  document.getElementById('root')
);
