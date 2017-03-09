import React from 'react';
import { Item } from './logging';

var formatDate = timestamp => {
  var days = new Array("Sunday", "Monday", "Tuesday",
                       "Wednesday", "Thursday", "Friday", "Saturday");
  var months = new Array("January", "February", "March", "April",
                         "May", "June", "July", "August", "September",
                         "October", "November", "December");
  var superscript = "";

  var d = new Date(timestamp)
  var date = d.getDate()
  var day = d.getDay()
  var month = d.getMonth()
  var year = d.getFullYear()
  var hour = d.getHours()
  var min = d.getMinutes()
  min = ('00'+min).substring((min+"").length)

  if (date%10 == 1)      superscript = "st"
  else if (date%10 == 2) superscript = "nd"
  else if (date%10 == 3) superscript = "rd";
  else                   superscript = "th"

  return days[day]+' '+months[month]+' '+date+superscript+' '+year+' @'+hour+min+'h';
};

export class WeatherWidget extends React.Component {
  render() {
    if(this.props.data === undefined || !Object.keys(this.props.data).length) return (<div className="card bg-inverse text-white">No data yet...</div>);
    if(this.props.debug) return (
      <div className="card bg-inverse text-white">
        <h1>Debugging</h1>
        <Item key='/' path='/' index='' data={this.props.data} />
      </div>
    );
    return (
    <div className="card card-inverse bg-inverse">
      <h1 className="card-header"><i className={`wi wi-forecast-io-${this.props.data.currently.icon}`} /> {this.props.data.currently.temperature}&deg;F</h1>
      <div className="card-block">
        <h3 className="card-title">Summary</h3>
        <p className="card-text">{this.props.data.currently.summary}</p>
      </div>
      <div className="card-footer text-muted row">
        <p className="col-sm text-left">{formatDate(this.props.data.currently.time*1000)}</p>
        <p className="col-sm text-sm-right">{this.props.data.latitude}, {this.props.data.longitude}</p>
      </div>
    </div>);
  }
}


