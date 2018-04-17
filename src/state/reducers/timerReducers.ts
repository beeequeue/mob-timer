// tslint:disable:interface-over-type-literal
import {
  RootAction,
  SET_TIME,
  COUNT_DOWN_ONE_SECOND,
  START_TIMER,
  STOP_TIMER,
} from '@state/actions/timerActions'
import { Time } from '../../time'

export type IStateTimer = {
  readonly counting: boolean
  readonly timeLeft: Time
  readonly duration: Time
}

const initialState: IStateTimer = {
  counting: false,
  timeLeft: new Time(),
  duration: new Time(),
}

const cachedSettings = JSON.parse(
  localStorage.getItem('cache') || '{ "timer": null }'
).timer

if (cachedSettings) {
  cachedSettings.timeLeft = new Time(
    cachedSettings.timeLeft.minutes,
    cachedSettings.timeLeft.seconds
  )

  cachedSettings.duration = new Time(
    cachedSettings.duration.minutes,
    cachedSettings.duration.seconds
  )
}

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
        counting: true,
      })

    case STOP_TIMER:
      return Object.assign({}, state, {
        counting: false,
      })

    case COUNT_DOWN_ONE_SECOND:
      return Object.assign({}, state, {
        timeLeft: state.timeLeft.reduceByOneSecond(),
      })

    default:
      return state
  }
}
