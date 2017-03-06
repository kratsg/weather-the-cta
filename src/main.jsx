import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request-promise';

import { Logged } from './logging';
import { Subscribed } from './subscription';

var renderRecursive = (path, index, val) => {
  if(val instanceof Object)
    return <Dict key={path} path={path} index={index} data={val} />
  else if(val instanceof Array)
    return <List key={path} path={path} index={index} data={val} />
  else
    return <span>{val}</span>
}

class Item extends React.Component {
  render() {
    return <li>
      {this.props.index}:
      { renderRecursive(this.props.path, this.props.index, this.props.data) }
    </li>
  }
}

class List extends React.Component {
  dump(data) {
    return data.map((key, index) => <Item key={this.props.path.replace(/\/$/,'') + '/' + key} path={this.props.path.replace(/\/$/,'') + '/' + key} index={index} data={key} />)
  }

  render() {
    return <ol>
      {this.dump(this.props.data)}
    </ol>
  }
}

class Dict extends React.Component {
    dump(data) {
    return Object.keys(data).map((key, index) => <Item key={this.props.path.replace(/\/$/,'') + '/' + key} path={this.props.path.replace(/\/$/,'') + '/' + key} index={key} data={data[key]} />)
  }

  render() {
    return <ul>
      { this.dump(this.props.data) }
    </ul>
  }
}
Dict.defaultProps = {index: '/', path: '/'}

class WeatherWidget extends React.Component {
  render() {
    if(this.props.data === undefined || !Object.keys(this.props.data).length) return (<div><h1>No data yet...</h1></div>);
    return (
      <div>
        <h1>Data</h1>
        <Dict data={this.props.data} />
      </div>
    );
  }
}

const SubscribedWeatherWidget = Logged(Subscribed(WeatherWidget, () => request({uri: `${document.location.href.replace(/\/$/,'')}/api/weather`, json: true}).catch(console.error)));

ReactDOM.render(
  <SubscribedWeatherWidget timedelta='5000' />,
  document.getElementById('root')
);
