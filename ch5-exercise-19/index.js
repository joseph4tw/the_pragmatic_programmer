const fs = require('fs');

const STATES = {
  InString: 'instring',
  LookForString: 'lookforstring',
  CopyNextChar: 'copynextchar',
};

const ACTIONS = {
  Ignore: 'ignore',
  StartNewString: 'startnewstring',
  AddCurrentToString: 'addcurrenttostring',
  FinishCurrentString: 'finishcurrentstring',
};

const TRANSITIONS = {
  // current  new state               action to take
  // ----------------------------------------------------------------
  [STATES.LookForString]: {
    '"':      [ STATES.InString,      ACTIONS.StartNewString ],
    default:  [ STATES.LookForString, ACTIONS.Ignore ],
  },
  [STATES.InString]: {
    '"':      [ STATES.LookForString, ACTIONS.FinishCurrentString ],
    '\\':     [ STATES.CopyNextChar,  ACTIONS.AddCurrentToString ],
    default:  [ STATES.InString,      ACTIONS.AddCurrentToString ],
  },
  [STATES.CopyNextChar]: {
    default:  [ STATES.InString,      ACTIONS.AddCurrentToString ],
  },
};

const fsm = createFSM(TRANSITIONS, STATES.LookForString);
const content = fs.readFileSync('./example.txt').toString();
const lines = content.split('\n');

lines.forEach(line => {
  let result = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const action = fsm.transition(char);

    switch (action) {
      case ACTIONS.Ignore:
      case ACTIONS.StartNewString:
        result = [];
        break;

      case ACTIONS.AddCurrentToString:
        result.push(char);
        break;

      case ACTIONS.FinishCurrentString:
        console.log(result.join(''));
        break;

      default:
        break;
    }
  }
});

/**
 * 
 * @param {Object} transitions An object that describes the next state and actions to take on current state.
 * @param {string} initialState The initial state to set the FSM to.
 * @returns {function} The `transition` function that progresses the FSM.
 */
function createFSM(transitions, initialState) {
  let _state = initialState;
  let _action;
  const _transitions = JSON.parse(JSON.stringify(transitions));

  /**
   * The `transition` function progresses the FSM.
   * @param {string} condition The condition that will determine the action and next state.
   * @returns {string} The resulting acction to take.
   */
  const transition = (condition) => {
    [_state, _action] = _transitions[_state][condition] || _transitions[_state].default;
    return _action;
  };

  return {
    transition,
  };
}
