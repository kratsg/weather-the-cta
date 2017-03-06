import React from 'react';

export const getDisplayName = Component => {
  return Component.displayName || Component.name || 'UnknownComponent';
};


// https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
export const Logged = ComposedComponent => class extends React.Component {
  render() {
    console.log(`Rendering ${getDisplayName(ComposedComponent)}`);
    return <ComposedComponent {...this.props} />;
  }
};
