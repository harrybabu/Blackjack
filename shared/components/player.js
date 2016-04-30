import React from 'react';
import Card from './card';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`players ${this.props.playerType}`} key={'players' + this.props.playerType}>
        <div className="card-space" key={'cardSpace' + this.props.playerType}>
          {
            this.props.hand.map(
              (card) =>{
                return ( <Card card={card} /> );
              }
            )
          }
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  playerType: React.PropTypes.string.isRequired,
  hand: React.PropTypes.array.isRequired,
  score: React.PropTypes.number,
  hitButton: React.PropTypes.func,
  stickButton: React.PropTypes.func
};
