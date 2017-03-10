import React from 'react';

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
    var cardHeaderStyle = {backgroundColor: '#222'}
    if(this.props.data === undefined || this.props.data === null || !Object.keys(this.props.data).length) return (
      <div className="card card-inverse bg-inverse">
        <div className="card-header" style={cardHeaderStyle}>
          <h1 className="display-1">
            <i className="fa fa-cog fa-spin fa-fw" aria-hidden="true"></i><span className="sr-only">Loading...</span>
            Loading weather data...
          </h1>
        </div>
        <div className="card-block">
          <h1 className="card-title">Looking out the window</h1>
          <h3 className="card-text">Should take about 5 seconds...</h3>
        </div>
        <div className="card-footer text-muted row">
          <p className="col-sm text-left">Weather data provided by Forecast.io</p>
        </div>
      </div>
    );
    return (
    <div className="card card-inverse bg-inverse">
      <div className="card-header" style={cardHeaderStyle}>
        <h1 className="display-1">
          <i className={`wi wi-forecast-io-${this.props.data.currently.icon} fa-fw`} aria-hidden="true" /><span className="sr-only">Current weather conditions</span>
          {this.props.data.currently.temperature}&deg;F
        </h1>
      </div>
      <div className="card-block">
        <h1 className="card-title">Summary</h1>
        <h3 className="card-text">{this.props.data.currently.summary}</h3>
      </div>
      <div className="card-footer text-muted row">
        <p className="col-sm text-left">{formatDate(this.props.data.currently.time*1000)}</p>
        <p className="col-sm text-sm-right">{this.props.data.latitude}, {this.props.data.longitude}</p>
      </div>
    </div>);
  }
}


