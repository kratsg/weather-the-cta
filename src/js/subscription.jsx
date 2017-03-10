import React from 'react';

import { getDisplayName } from './utils';

// Use arrow-function-in-constructor to bind, cannot bind class methods
//      http://blog.andrewray.me/react-es6-autobinding-and-createclass/
export const SubscribedHOC = (WrappedComponent, fetchData) => {
  class SubscribedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.interval = null;
      this.state = {counter: 0, data: {}};
      this.tick = () => fetchData()
                              .then(data => {this.setState((prevState, props) => ({counter: prevState.counter + 1, data: data}))})
                              .catch(console.error);
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
      if(this.props.debug) console.log(`Rendered ${getDisplayName(SubscribedComponent)} ${this.state.counter} times.`);
      if(this.props.debug) console.log(this.state.data);
      return <WrappedComponent data={this.state.data} debug={this.props.debug} />
    }
  }
  SubscribedComponent.defaultProps = {timedelta: 1000, debug: false};
  SubscribedComponent.displayName = `Subscribed(${getDisplayName(WrappedComponent)})`;
  return SubscribedComponent;
}
