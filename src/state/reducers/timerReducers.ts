import { Reducer } from 'redux'

import { IRootActions } from '@state/index'
import {
  COUNT_DOWN_ONE_SECOND,
  SET_TIME,
  START_TIMER,
  STOP_TIMER,
  ADD_NOTIFICATION,
} from '@state/actions/constants'

import { Time } from '../../time'

export interface IStateTimer {
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
  cachedSettings.timeLeft = Time.fromTime(cachedSettings.timeLeft)

  cachedSettings.duration = Time.fromTime(cachedSettings.duration)
}

export const timerReducers: Reducer<IStateTimer, IRootActions> = (
  state = { ...initialState, ...cachedSettings },
  action
) => {
  switch (action.type) {
    case SET_TIME:
      const time = Time.fromTime(action.payload)

      return {
        ...state,
        timeLeft: time,
        duration: time,
      }

    case START_TIMER:
      state.notifications.forEach(notification => notification.close())

      return {
        ...state,
        timeLeft:
          state.timeLeft.toSeconds() !== 0 ? state.timeLeft : state.duration,
        counting: true,
        notifications: [],
      }

    case STOP_TIMER:
      return {
        ...state,
        counting: false,
      }

    case COUNT_DOWN_ONE_SECOND:
      return {
        ...state,
        timeLeft: state.timeLeft.reduceByOneSecond(),
      }

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          action.payload,
          ...state.notifications,
        ],
      }


    default:
      return state
  }
}
