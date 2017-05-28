import React from 'react';

export class TransitWidget extends React.Component {
  render() {
    var cardHeaderStyle = {backgroundColor: '#222'}
    if(!this.data) return;
    return (
    <div className="card-deck">
      <div className="card card-inverse bg-inverse">
        <div className="card-header" style={cardHeaderStyle}>
          <h1 className="display-2">
            Bus Times
          </h1>
        </div>
        <div className="card-block">
          <div className="row">
            <div className="col-2">
              Vroom
            </div>
            <div className="col-10">
              <h1 className="card-title display-3">Bus?</h1>
              <h3 className="card-text display-4">Coming in some time...</h3>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}
