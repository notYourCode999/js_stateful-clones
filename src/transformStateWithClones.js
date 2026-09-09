'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let newState = { ...currentState };

    if (action.type === 'addProperties') {
      newState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      for (let j = 0; j < action.keysToRemove.length; j++) {
        delete newState[action.keysToRemove[j]];
      }
    }

    if (action.type === 'clear') {
      const keys = Object.keys(newState);

      for (let k = 0; k < keys.length; k++) {
        delete newState[keys[k]];
      }
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
