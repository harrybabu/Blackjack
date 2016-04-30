import React from 'react';

export default class Chip extends React.Component {

  addChip(event, chipClass, chipValue) {
    this.props.addToTable(event, chipClass, chipValue);
  }

  render() {
    return (
      <div className="chipsContainer">
       <div className="chipContainer chipAnimation" onClick={this.addChip.bind(this, 'chip5_show', 5)}>
        <span className="commonSprite chipHolder chip5 chipAnimation"></span>
        <span className="commonSprite chipHolder chip5 chipAnimation"></span>
        <span className="commonSprite chipHolder chip5 chipAnimation"></span>
        <span className="commonSprite chipHolder chip5 chipAnimation"></span>
        <span className="commonSprite chipHolder chip5 chipAnimation"></span>
       </div>
       <div className="chipContainer chipAnimation" onClick={this.addChip.bind(this, 'chip10_show', 10)}>
        <span className="commonSprite chipHolder chip10 chipAnimation"></span>
        <span className="commonSprite chipHolder chip10 chipAnimation"></span>
        <span className="commonSprite chipHolder chip10 chipAnimation"></span>
        <span className="commonSprite chipHolder chip10 chipAnimation"></span>
        <span className="commonSprite chipHolder chip10 chipAnimation"></span>
       </div>
       <div className="chipContainer chipAnimation" onClick={this.addChip.bind(this, 'chip25_show', 25)}>
        <span className="commonSprite chipHolder chip25 chipAnimation"></span>
        <span className="commonSprite chipHolder chip25 chipAnimation"></span>
        <span className="commonSprite chipHolder chip25 chipAnimation"></span>
        <span className="commonSprite chipHolder chip25 chipAnimation"></span>
        <span className="commonSprite chipHolder chip25 chipAnimation"></span>
       </div>
       <div className="chipContainer chipAnimation" onClick={this.addChip.bind(this, 'chip100_show', 100)}>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
        <span className="commonSprite chipHolder chip100 chipAnimation"></span>
       </div>
      </div>
    );
  }
}

Chip.propTypes = {
  addToTable: React.PropTypes.func.isRequired
};
