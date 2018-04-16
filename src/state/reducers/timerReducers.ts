// tslint:disable:interface-over-type-literal
import {
  SET_TIME,
  START_TIMER,
  COUNT_DOWN_ONE_SECOND,
  CLEAR_LOOP,
  RootAction,
} from '@state/actions/timerActions'
import { Time } from '../../time'

export type IStateTimer = {
  readonly timerLoop: number | undefined
  readonly timeLeft: Time
  readonly duration: Time
}

const initialState: IStateTimer = {
  timerLoop: undefined,
  timeLeft: new Time(),
  duration: new Time(),
}

const cachedSettings = JSON.parse(
  localStorage.getItem('cache') || '{ "timer": null }'
).timer

cachedSettings.timeLeft = new Time(
  cachedSettings.timeLeft.minutes,
  cachedSettings.timeLeft.seconds
)
cachedSettings.duration = new Time(
  cachedSettings.duration.minutes,
  cachedSettings.duration.seconds
)

export const timerReducers = (
  state = Object.assign({}, initialState, cachedSettings),
  action: RootAction
) => {
  switch (action.type) {
    case SET_TIME:
      const time = Time.fromTime(action.payload)

      return Object.assign({}, state, {
        timeLeft: time,
        duration: time,
      })

    case START_TIMER:
      return Object.assign({}, state, {
        timeLeft:
          state.timeLeft.toSeconds() !== 0 ? state.timeLeft : state.duration,
        timerLoop: action.payload,
      })

    case CLEAR_LOOP:
      return Object.assign({}, state, {
        timerLoop: null,
      })

    case COUNT_DOWN_ONE_SECOND:
      return Object.assign({}, state, {
        timeLeft: state.timeLeft.reduceByOneSecond(),
      })

    default:
      return state
  }
}
