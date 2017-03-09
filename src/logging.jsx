import React from 'react';

export const getDisplayName = Component => {
  return Component.displayName || Component.name || 'UnknownComponent';
};


// https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
export const LoggedHOC = ComposedComponent => {
  class LoggedComponent extends React.Component {
    render() {
      if(this.props.debug) console.log(`Rendering ${getDisplayName(ComposedComponent)}`);
      return <ComposedComponent {...this.props} />;
    }
  }

  LoggedComponent.displayName = `Logged(${getDisplayName(ComposedComponent)})`;
  return LoggedComponent;
};

// For debugging purposes
export var renderRecursive = (path, index, val) => {
  if(val instanceof Object)
    return <Dict key={path} path={path} index={index} data={val} />
  else if(val instanceof Array)
    return <List key={path} path={path} index={index} data={val} />
  else
    return <span>{val}</span>
}

export class Item extends React.Component {
  render() {
    let topLine = '<root>';
    if(this.props.index !== ''){topLine = this.props.index+':';}
    return <li>
      {topLine}
      { renderRecursive(this.props.path, this.props.index, this.props.data) }
    </li>
  }
}

export class List extends React.Component {
  dump(data) {
    return data.map((key, index) => <Item key={this.props.path.replace(/\/$/,'') + '/' + key} path={this.props.path.replace(/\/$/,'') + '/' + key} index={index} data={key} />)
  }

  render() {
    return <ol>
      {this.dump(this.props.data)}
    </ol>
  }
}

export class Dict extends React.Component {
    dump(data) {
    return Object.keys(data).map((key, index) => <Item key={this.props.path.replace(/\/$/,'') + '/' + key} path={this.props.path.replace(/\/$/,'') + '/' + key} index={key} data={data[key]} />)
  }

  render() {
    return <ul>
      { this.dump(this.props.data) }
    </ul>
  }
}
