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
  hour = ('00'+hour).substring((hour+"").length)
  var min = d.getMinutes()
  min = ('00'+min).substring((min+"").length)

  if (date%10 == 1)      superscript = "st"
  else if (date%10 == 2) superscript = "nd"
  else if (date%10 == 3) superscript = "rd";
  else                   superscript = "th"

  return [days[day]+' '+months[month]+' '+date+superscript+' '+year, hour+':'+min];
};

export class WeatherWidget extends React.Component {
  render() {
    var cardHeaderStyle = {backgroundColor: '#222'}
    if(this.props.data === undefined || this.props.data === null || !Object.keys(this.props.data).length) return (
      <div className="card card-inverse bg-inverse">
        <div className="card-header" style={cardHeaderStyle}>
          <h1 className="display-2">
            <i className="fa fa-cog fa-spin fa-fw" aria-hidden="true"></i><span className="sr-only">Loading...</span>
           &nbsp; Loading weather data...
          </h1>
        </div>
        <div className="card-block">
          <h1 className="card-title display-3">Looking out the window</h1>
          <h3 className="card-text display-4">Should take about 5 seconds...</h3>
        </div>
        <div className="card-footer text-muted">
          <div className="row">
            <p className="col-sm text-left">Weather data provided by Forecast.io</p>
          </div>
        </div>
      </div>
    );
    return (
    <div className="card-deck">
      <div className="card card-inverse bg-inverse">
        <div className="card-header" style={cardHeaderStyle}>
          <h1 className="display-2">
            Current Conditions
          </h1>
        </div>
        <div className="card-block">
          <div className="row">
            <div className="col-2">
              <i className={`fa-5x wi wi-forecast-io-${this.props.data.currently.icon} fa-fw`} aria-hidden="true" /><span className="sr-only">Current weather conditions</span>
            </div>
            <div className="col-10">
              <h1 className="card-title display-3">{Math.round(this.props.data.currently.temperature)}<i className="wi wi-degrees" />, feels like {Math.round(this.props.data.currently.apparentTemperature)}<i className="wi wi-degrees" /></h1>
              <h3 className="card-text display-4">{this.props.data.currently.summary}</h3>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          <div className="row">
            <p className="col-sm text-left">{formatDate(this.props.data.currently.time*1000)[1]}</p>
            <p className="col-sm text-sm-right">{this.props.data.latitude}, {this.props.data.longitude}</p>
          </div>
        </div>
      </div>
      <div className="card card-inverse bg-inverse">
        <div className="card-header" style={cardHeaderStyle}>
          <h1 className="display-2">
            Today's Forecast
          </h1>
        </div>
        <div className="card-block">
          <div className="row">
            <div className="col-2">
              <i className={`fa-5x wi wi-forecast-io-${this.props.data.daily.icon} fa-fw`} aria-hidden="true" /><span className="sr-only">Today's weather forecast</span>
            </div>
            <div className="col-10">
              <h1 className="card-title display-3">
                <span className="text-primary">{Math.round(this.props.data.daily.data[0].temperatureMax)}<i className="wi wi-degrees" /></span> <span className="text-info">{Math.round(this.props.data.daily.data[0].temperatureMin)}<i className="wi wi-degrees" /></span></h1>
              <h3 className="card-text display-4">{this.props.data.daily.summary}</h3>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          <div className="row">
            <p className="col-sm text-left">{formatDate(this.props.data.daily.data[0].time*1000)[0]}</p>
            <p className="col-sm text-sm-right">{this.props.data.latitude}, {this.props.data.longitude}</p>
          </div>
        </div>
      </div>
    </div>);
  }
}


