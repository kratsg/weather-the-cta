import React from 'react';

export class CTABusesWidget extends React.Component {
  render() {
    if(!this.props.data) return(<div />);
    return (
    <div className="card-deck">
      {this.props.data.prd.map( busPrediction => <CTABusPrediction key={busPrediction.stpid} data={busPrediction} /> )}
    </div>);
  }
}

class CTABusPrediction extends React.Component {
  render() {
    return(
    <div className="card card-inverse bg-inverse">
      {this.props.data.rtdir} #{this.props.data.rt} {this.props.data.typ == 'A' ? ' arriving at ' : ' departing from '} {this.props.data.stpnm} in {this.props.data.prdctdn} minutes.
    </div>
    );
  }
}
