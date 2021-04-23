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

const content = fs.readFileSync('./example.txt').toString();
const lines = content.split('\n');

lines.forEach(line => {
  let state = STATES.LookForString;
  let action;
  let result = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    [state, action] = TRANSITIONS[state][char] || TRANSITIONS[state].default;
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
