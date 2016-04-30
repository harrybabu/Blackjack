export const UPDATE_DECK = 'UPDATE_DECK';
export const UPDATE_BET = 'UPDATE_BET';
export const UPDATE_PLAYER_HAND = 'UPDATE_PLAYER_HAND';
export const UPDATE_DEALER_HAND = 'UPDATE_DEALER_HAND';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const UPDATE_TURN = 'UPDATE_TURN';
export const CLEAR_TURN = 'CLEAR_TURN';
export const UPDATE_PLAY = 'UPDATE_PLAY';

export function generateDeck() {
  const deck = [];
  const suits = ['s', 'd', 'c', 'h'];
  const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

  for (let itr = 0; itr < suits.length; itr++) {
    for (let jtr = 0; jtr < value.length; jtr++) {
      const card = suits[itr] + value[jtr];
      deck.push(card);
    }
  }
  return {
    type: UPDATE_DECK,
    deck
  };
}

export function updateTurn(turn, clearHand) {
  return {
    type: UPDATE_TURN,
    turn,
    clearHand
  };
}

export function updateBet(betValue, playerPocket) {
  return {
    type: UPDATE_BET,
    bet: betValue,
    playerPocket: playerPocket
  };
}

export function updatePlayerHand(newCard) {
  return {
    type: UPDATE_PLAYER_HAND,
    newCard
  };
}

export function updateDealerHand(newCard) {
  return {
    type: UPDATE_DEALER_HAND,
    newCard
  };
}

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message
  };
}

export function updatePlay(showPlay) {
  return {
    type: UPDATE_PLAY,
    showPlay
  };
}
export function clearTurn() {
  return {
    type: CLEAR_TURN
  };
}
