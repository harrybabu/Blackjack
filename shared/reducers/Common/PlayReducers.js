import { UPDATE_DECK, UPDATE_TURN, UPDATE_BET, UPDATE_PLAYER_HAND, UPDATE_DEALER_HAND, UPDATE_MESSAGE, UPDATE_PLAY, CLEAR_TURN} from '../../actions/PlayActions';
import { calculateHand } from '../../helpers/Helpers';

const initialResultsState = {
  deck: [],
  cardsTotal: 0,
  cardsLeft: 0,
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  turn: 0,
  message: '',
  clearHand: true,
  bet: 0,
  playerPocket: 1000,
  showPlay: false
};

export default function hotelsReducer(previousState, action) {
  let state = previousState;
  switch (action.type) {
    case UPDATE_DECK:
      return Object.assign({}, previousState, {
        deck: action.deck,
        cardsTotal: action.deck.length,
        cardsLeft: action.deck.length,
      });

    case UPDATE_TURN:
      return Object.assign({}, previousState, {
        turn: action.turn,
        showPlay: false,
        clearHand: action.clearHand
      });

    case UPDATE_BET:
      return Object.assign({}, previousState, {
        bet: action.bet,
        playerPocket: action.playerPocket
      });

    case UPDATE_PLAYER_HAND:
      const previousHand = previousState.playerHand;
      previousHand.push(action.newCard);
      const pScore = calculateHand(previousHand);
      return Object.assign({}, previousState, {
        playerHand: previousHand,
        playerScore: pScore
      });

    case UPDATE_DEALER_HAND:
      const previousValue = previousState.dealerHand;
      previousValue.push(action.newCard);
      const dScore = calculateHand(previousValue);
      return Object.assign({}, previousState, {
        dealerHand: previousValue,
        dealerScore: dScore
      });

    case UPDATE_MESSAGE:
      return Object.assign({}, previousState, {
        message: action.message,
      });

    case UPDATE_PLAY:
      return Object.assign({}, previousState, {
        showPlay: action.showPlay,
      });

    case CLEAR_TURN:
      return Object.assign({}, previousState, {
        playerHand: [],
        playerScore: 0,
        dealerHand: [],
        dealerScore: 0,
        clearHand: true,
        showPlay: false,
        message: '',
        bet: 0,
        turn: 0
      });

    default:
      if (state === undefined) {
        state = initialResultsState;
      }
      return state;
  }
}
