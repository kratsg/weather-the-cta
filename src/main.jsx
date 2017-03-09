import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request-promise';

import { LoggedHOC } from './logging';
import { SubscribedHOC } from './subscription';
import { WeatherWidget } from './weather';
import { CTABusesWidget } from './transport';

var weatherOptions = {
  uri: `${document.location.href.replace(/\/$/,'')}/api/weather`,
  json: true
}

const SubscribedWeatherWidget = LoggedHOC(SubscribedHOC(WeatherWidget, () => request(weatherOptions)));

ReactDOM.render(
  <SubscribedWeatherWidget timedelta='5000' debug={null} />,
  document.getElementById('root')
);
