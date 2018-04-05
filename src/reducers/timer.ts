import { Action } from 'redux'
import { SET_TIME } from '../actions/types'
import { Time } from '../time';

const initialState: IStateTimer = {
  timerLoop: null,
  timeLeft: new Time(),
  duration: new Time(),
}

export const timerReducers = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TIME:
      const time = new Time(action.payload)

      return Object.assign({}, state, {
        timeLeft: time,
        duration: time,
      })

    default:
      return state
  }
}
