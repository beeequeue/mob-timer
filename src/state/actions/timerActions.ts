// tslint:disable:interface-over-type-literal
import { Time } from '../../time'

export const SET_TIME = 'SET_TIME'
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const COUNT_DOWN_ONE_SECOND = 'COUNT_DOWN_ONE_SECOND'
export const COUNT_DOWN_FINISHED = 'COUNT_DOWN_FINISHED'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'

export type Actions = {
  readonly SET_TIME: {
    type: typeof SET_TIME
    payload: Time
  }
  readonly START_TIMER: {
    type: typeof START_TIMER
  }
  readonly STOP_TIMER: {
    type: typeof STOP_TIMER
  }
  readonly COUNT_DOWN_ONE_SECOND: {
    type: typeof COUNT_DOWN_ONE_SECOND
  }
  readonly COUNT_DOWN_FINISHED: {
    type: typeof COUNT_DOWN_FINISHED
  }
  readonly ADD_NOTIFICATION: {
    type: typeof ADD_NOTIFICATION
    payload: Notification
  }
}

export type RootAction = Actions[keyof Actions]

export const setTime = (payload: Time): Actions[typeof SET_TIME] => ({
  type: SET_TIME,
  payload,
})

export const startTimer = (): Actions[typeof START_TIMER] => ({
  type: START_TIMER,
})

export const stopTimer = (): Actions[typeof STOP_TIMER] => ({
  type: STOP_TIMER,
})

export const countDownOneSecond = (): Actions[typeof COUNT_DOWN_ONE_SECOND] => ({
  type: COUNT_DOWN_ONE_SECOND,
})

export const countDownFinished = (): Actions[typeof COUNT_DOWN_FINISHED] => ({
  type: COUNT_DOWN_FINISHED,
})

export const addNotification = (
  notification: Notification
): Actions[typeof ADD_NOTIFICATION] => ({
  type: ADD_NOTIFICATION,
  payload: notification,
})
