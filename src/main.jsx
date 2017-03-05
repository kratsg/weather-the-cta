import React from 'react';
import ReactDOM from 'react-dom';

// Use arrow-function-in-constructor to bind, cannot bind class methods
//      http://blog.andrewray.me/react-es6-autobinding-and-createclass/
function withSubscription(WrappedComponent, fetchData) {
  class SubscribedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.interval = null;
      this.state = {counter: 0, data: fetchData(props)};
      this.tick = () => this.setState((prevState, props) => ({counter: prevState.counter + 1, data: fetchData(props)}));
    }

    startUpdates() {
      this.interval = setInterval(this.tick, this.props.timedelta);
    }

    stopUpdates() {
      clearInterval(this.interval);
      this.interval = null;
    }

    componentWillMount() {
      this.interval = null;
    }

    componentDidMount() {
      this.startUpdates();
    }

    componentWillUnmount() {
      this.stopUpdates();
    }

    render() {
      return <WrappedComponent {...this.state} />
    }
  }
  SubscribedComponent.defaultProps = {timedelta: 1000};
  return SubscribedComponent;
}

class WeatherWidget extends React.Component {
  render() {
    return <h1>I have run the subscription {this.props.counter} times.</h1>
  }
}

const SubscribedWeatherWidget = withSubscription(WeatherWidget, () => {});

ReactDOM.render(
  <SubscribedWeatherWidget timedelta='5000' />,
  document.getElementById('root')
);
