import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request-promise';

import { LoggedHOC } from './logging';
import { SubscribedHOC } from './subscription';
import { WeatherWidget } from './weather';
import { CTABusesWidget } from './transit';

var weatherOptions = {
  uri: `${document.location.href.replace(/\/$/,'')}/api/weather`,
  json: true
}

var ctaBusesOptions = {
  uri: `${document.location.href.replace(/\/$/,'')}/api/cta/buses`,
  json: true
}

const SubscribedWeatherWidget = LoggedHOC(SubscribedHOC(WeatherWidget, () => request(weatherOptions)));
const SubscribedCTABusesWidget = LoggedHOC(SubscribedHOC(CTABusesWidget, () => request(ctaBusesOptions)));

ReactDOM.render(
  (<div>
    <SubscribedWeatherWidget timedelta='5000' debug={null} />
    <SubscribedCTABusesWidget timedelta='1000' debug={null} />
  </div>)
  ,
  document.getElementById('root')
);
