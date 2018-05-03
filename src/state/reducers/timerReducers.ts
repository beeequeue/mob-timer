// tslint:disable:interface-over-type-literal
import {
  RootAction,
  SET_TIME,
  COUNT_DOWN_ONE_SECOND,
  START_TIMER,
  STOP_TIMER,
  ADD_NOTIFICATION,
} from '@state/actions/timerActions'
import { Time } from '../../time'

export type IStateTimer = {
  readonly counting: boolean
  readonly timeLeft: Time
  readonly duration: Time
  readonly notifications: ReadonlyArray<Notification>
}

const initialState: IStateTimer = {
  counting: false,
  timeLeft: new Time(),
  duration: new Time(),
  notifications: [],
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
  state: IStateTimer = Object.assign({}, initialState, cachedSettings),
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
      state.notifications.forEach(notification => notification.close())

      return Object.assign({}, state, {
        timeLeft:
          state.timeLeft.toSeconds() !== 0 ? state.timeLeft : state.duration,
        counting: true,
        notifications: [],
      })

    case STOP_TIMER:
      return Object.assign({}, state, {
        counting: false,
      })

    case COUNT_DOWN_ONE_SECOND:
      return Object.assign({}, state, {
        timeLeft: state.timeLeft.reduceByOneSecond(),
      })

    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: [action.payload, ...state.notifications],
      })

    default:
      return state
  }
}
