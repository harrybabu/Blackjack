export function calculateHand(hand) {
  let total = 0;
  let aces = 0;
  let aceTotal = 0;

  for (let itr = 0; itr < hand.length; itr++) {
    const card = hand[itr];
    let value = card.slice(1);

    if (isNaN(value)) {
      if (value !== 'a') {
        value = 10;
      } else {
        value = 0;
        aces++;
      }
    }
    total = parseInt(total, 10) + parseInt(value, 10);
  }

  for (let itr1 = 0; itr1 < aces; itr1++) {
    if ((total + 11) < 22) {
      aceTotal = parseInt(aceTotal, 10) + 11;
    } else {
      aceTotal++;
    }
  }

  if ((total + aceTotal) > 21) {
    aceTotal = 0;
    for (let itr2 = 0; itr2 < aces; itr2++) {
      aceTotal++;
    }
  }

  total = parseInt(total, 10) + parseInt(aceTotal, 10);

  return total;
}

export function checkHandStatus(total) {
  let result;
  if (total > 21) {
    result = 'playerBust';
  } else if ( total === 21) {
    result = 'playerBlackjack';
  } else {
    result = '';
  }

  return result;
}

export function addClass(element, classToAdd) {
  if (!classToAdd || !element || element.className.indexOf(classToAdd) !== -1) { return; }
  const classArray = element.className.split(' ');
  classArray.push(classToAdd);
  element.className = classArray.join(' ');
}

export function removeClass(element, classToRemove) {
  if (!classToRemove || !element) { return; }
  const classArray = element.className.split(' ');
  if (classArray.indexOf(classToRemove) === -1) {
    return;
  }
  classArray.splice(classArray.indexOf(classToRemove), 1);
  element.className = classArray.join(' ');
}
