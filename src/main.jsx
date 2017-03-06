import React from 'react';
import ReactDOM from 'react-dom';

import { Logged } from './logging';
import { Subscribed } from './subscription';

class WeatherWidget extends React.Component {
  render() {
    return <h1>Data = {this.props.data}</h1>
  }
}

const SubscribedWeatherWidget = Logged(Subscribed(WeatherWidget, () => Promise.resolve({})));

ReactDOM.render(
  <SubscribedWeatherWidget timedelta='5000' />,
  document.getElementById('root')
);
