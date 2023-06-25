interface State {
  dividends: string
}

export enum ActionType {
  SET_DIVIDENDS = 'SET_DIVIDENDS',
}

type Action = { type: ActionType.SET_DIVIDENDS; payload: string }

export function appReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_DIVIDENDS:
      return { ...state, dividends: action.payload }
    default:
      return state
  }
}
