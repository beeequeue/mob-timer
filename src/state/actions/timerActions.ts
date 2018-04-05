import {
  SET_TIME,
  START_TIMER,
  STOP_TIMER,
  COUNT_DOWN_ONE_SECOND,
  CLEAR_LOOP,
} from './types'

export const setTime = (payload: string) => ({
  type: SET_TIME,
  payload,
})

export const startTimer = (payload: number) => ({
  type: START_TIMER,
  payload,
})

export const stopTimer = () => ({ type: STOP_TIMER })

export const clearLoop = () => ({ type: CLEAR_LOOP })

export const countDownOneSecond = () => ({ type: COUNT_DOWN_ONE_SECOND })
