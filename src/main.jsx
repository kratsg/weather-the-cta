import React from 'react';
import ReactDOM from 'react-dom';

import { Logged } from './logging';
import { Subscribed } from './subscription';

class WeatherWidget extends React.Component {
  render() {
    if(!Object.keys(this.props.data).length) return (<div><h1>No data yet...</h1></div>);
    return (
      <div>
        <h1>Data</h1>
        <ul>
        { Object.keys(this.props.data).map((key) => <li key={key}>{key}: {this.props.data[key]}</li>) }
        </ul>
      </div>
    );
  }
}

const SubscribedWeatherWidget = Logged(Subscribed(WeatherWidget, () => Promise.resolve({name: 'Giordon'})));

ReactDOM.render(
  <SubscribedWeatherWidget timedelta='5000' />,
  document.getElementById('root')
);
