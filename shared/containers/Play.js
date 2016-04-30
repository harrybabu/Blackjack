import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Player from '../components/player';
import Chip from '../components/chip';

import { generateDeck, updateTurn, updateBet, updatePlayerHand, updateDealerHand, updateMessage, updatePlay, clearTurn} from '../actions/PlayActions';
import { addClass, removeClass, checkHandStatus} from '../helpers/Helpers';

class Play extends Component {

  constructor(props) {
    super(props);
    this.addToTable = this.addToTable.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(generateDeck());
  }

  componentDidMount() {
  }

  addToTable(eleClass, betValue, event) {
    event.stopPropagation();
    const { dispatch, playStore} = this.props;
    const element = event.target;
    const currentPlayerPocket = playStore.playerPocket;
    const currentBet = playStore.bet;
    if (!element.classList.contains(eleClass)) {
      const newBetVal = currentBet + betValue;
      const newPocketVal = currentPlayerPocket - betValue;
      dispatch(updateBet(newBetVal, newPocketVal));
      addClass(element, eleClass);
    } else {
      const newBetVal = currentBet - betValue;
      const newPocketVal = currentPlayerPocket + betValue;
      dispatch(updateBet(newBetVal, newPocketVal));
      removeClass(element, eleClass);
    }
  }

  deal() {
    const { dispatch, playStore} = this.props;
    const deckLength = playStore.deck.length;
    if (playStore.turn === 0 && (deckLength >= 20) && (playStore.clearHand === true)) {
      this.dealCard('dealerHand');
      const self = this;
      setTimeout(() => {
        self.dealCard('playerHand');
        self.props.dispatch(updateTurn(1, false));
      }, 300);
      self.props.dispatch(updateMessage(''));
    } else if (deckLength < 20) {
      console.log('Less cards shuffle cards');
    } else {
      dispatch(clearTurn());
    }
  }

  dealCard(player) {
    // console.log(player);
    const { dispatch, playStore} = this.props;
    const { deck } = playStore;
    const deckLength = deck.length;
    if (deckLength.length !== 0) {
      const randomNumber = Math.floor((Math.random() * deckLength));
      const randomCard = deck[randomNumber];
      const newDeck = deck.splice(randomNumber, 1);
      if ( player === 'dealerHand' ) {
        dispatch(updateDealerHand(randomCard));
      } else {
        dispatch(updatePlayerHand(randomCard));
      }
      dispatch(generateDeck(newDeck));
    } else {
      console.log('out of cards');
    }
  }

  hit() {
    if (this.props.playStore.turn === 1) {
      this.dealCard('playerHand');
      const self = this;
      setTimeout(() => {
        const { playStore } = self.props;
        const { playerScore } = playStore;
        if (checkHandStatus(playerScore) !== '') {
          self.gameOver(checkHandStatus(playerScore), 'player');
        }
      }, 300);
    }
  }

  stick() {
    // console.log('stick');
    if (this.props.playStore.turn === 1) {
      let timer = '';
      const checker = () => {
        this.dealCard('dealerHand');
        const {playStore} = this.props;
        const { deck, playerScore, dealerScore } = playStore;
        if (dealerScore > 16 || (deck.length === 0)) {
          clearInterval(timer);
          if (dealerScore > 21 ) {
            this.gameOver('dealerBust', 'player');
          } else if (playerScore > dealerScore) {
            this.gameOver('player', 'player');
          } else if (dealerScore > playerScore) {
            this.gameOver('dealer', 'dealer');
          } else {
            this.gameOver('draw');
          }
        }
      };
      timer = setInterval(checker.bind(this), 800);
    }
  }

  clearHand() {
    const { dispatch} = this.props;
    dispatch(clearTurn());
  }

  gameOver(winnerKey, winner) {
    const { dispatch } = this.props;
    const msgClassMap = { playerBlackjack: 'blackJack', dealerBust: 'dealerBust', playerBust: 'playerBust', player: 'playerWon', dealer: 'dealerWon' };
    if (winnerKey !== 'draw') {
      dispatch(updateMessage(msgClassMap[winnerKey]));
      this.calculateBet(winner);

      dispatch(updatePlay(true));
    }
  }

  calculateBet(winner) {
    const { dispatch, playStore} = this.props;
    const { bet, playerPocket } = playStore;
    let result = 0;
    if ( winner === 'player' ) {
      result = playerPocket + (bet * 2);
    } else {
      result = playerPocket;
    }
    dispatch(updateBet(0, result));
  }

  render() {
    const { playStore} = this.props;
    const { turn, bet, playerHand, playerScore, playerPocket, dealerScore, dealerHand, showPlay, message } = playStore;
    let showBetMsg = false;
    let showDealMsg = false;
    let showDealerMsg = false;
    let showPlayerMsg = false;
    if ( turn === 0 ) {
      if ( bet === 0 ) {
        showBetMsg = true;
      } else {
        showDealMsg = true;
      }
    }

    if (playerHand.length > 0) {
      showPlayerMsg = true;
      showDealMsg = false;
    }
    if (dealerHand.length > 0) {
      showDealerMsg = true;
    }
    return (
      <div className="playContainer">
        {(showBetMsg) &&
          (<div className="msgContainer chipAnimation show_effect" onClick={this.deal.bind(this)} ></div>)
        }
        {(message) && (<div className={'msgBox ' + message + ' chipAnimation'}></div>)}
        {(showDealMsg) && (<div className="playerInfo chipAnimation dealButton" onClick={this.deal.bind(this)}></div>)}
        {(showPlayerMsg && !showPlay) && (<div className="playerInfo chipAnimation playerScore"><span className="dealerText">{playerScore}</span></div>)}
        {(showPlay && !showDealMsg) && (<div className="playerInfo chipAnimation playButton" onClick={this.clearHand.bind(this)}></div>)}
        <div className="playerInfo chipAnimation playerWonBg" style={{'display': 'none'}}><span className="dealerText">{playerScore}</span></div>
        {(showDealerMsg) && (
          <div className="dealerScore dealerInfo chipAnimation">
            <span className="dealerText">{dealerScore}</span>
          </div>
        )}
        <div className="betInfo">
        {bet}
        </div>
        {(showPlayerMsg) && (
          <div className="chipsContainer">
            <div className="chipContainer chipAnimation">
              <span className="actionSprite actionHolder hitButton chipAnimation" onClick={this.hit.bind(this)}></span>
              <span className="actionSprite actionHolder standButton chipAnimation" onClick={this.stick.bind(this)}></span>
            </div>
          </div>
        )}
        {(!showPlayerMsg) && (
          <Chip addToTable={this.addToTable.bind(this)}/>
        )}
        {(showPlayerMsg) && (
          <Player playerType="dealer" hand={dealerHand} score={dealerScore}/>
        )}
        {(showPlayerMsg) && (
          <Player playerType="player" hand={playerHand} score={playerScore} />
        )}
        <div className="moneyContainer">
          <span>{playerPocket}</span>
        </div>
      </div>
    );
  }
}

Play.propTypes = {
  playStore: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function whatToConnect(state) {
  return {
    playStore: state.playStore
  };
}

export default connect(whatToConnect)(Play);
