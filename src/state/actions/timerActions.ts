// tslint:disable:interface-over-type-literal
import { Time } from '../../time'

export const SET_TIME = 'SET_TIME'
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const CLEAR_LOOP = 'CLEAR_LOOP'
export const COUNT_DOWN_ONE_SECOND = 'COUNT_DOWN_ONE_SECOND'
export const COUNT_DOWN_FINISHED = 'COUNT_DOWN_FINISHED'

export type Actions = {
  SET_TIME: {
    type: typeof SET_TIME
    payload: Time
  }
  START_TIMER: {
    type: typeof START_TIMER
    payload: number
  }
  STOP_TIMER: {
    type: typeof STOP_TIMER
  }
  CLEAR_LOOP: {
    type: typeof CLEAR_LOOP
  }
  COUNT_DOWN_ONE_SECOND: {
    type: typeof COUNT_DOWN_ONE_SECOND
  }
  COUNT_DOWN_FINISHED: {
    type: typeof COUNT_DOWN_FINISHED
  }
}

export type RootAction = Actions[keyof Actions]

export const setTime = (payload: Time): Actions[typeof SET_TIME] => ({
  type: SET_TIME,
  payload,
})

export const startTimer = (payload: number): Actions[typeof START_TIMER] => ({
  type: START_TIMER,
  payload,
})

export const stopTimer = (): Actions[typeof STOP_TIMER] => ({
  type: STOP_TIMER,
})

export const clearLoop = (): Actions[typeof CLEAR_LOOP] => ({
  type: CLEAR_LOOP,
})

export const countDownOneSecond = (): Actions[typeof COUNT_DOWN_ONE_SECOND] => ({
  type: COUNT_DOWN_ONE_SECOND,
})

export const countDownFinished = (): Actions[typeof COUNT_DOWN_FINISHED] => ({
  type: COUNT_DOWN_FINISHED,
})
