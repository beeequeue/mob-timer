import { action, ActionType } from 'typesafe-actions'
import { Time } from '../../time'

export const SET_TIME = 'SET_TIME'
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const COUNT_DOWN_ONE_SECOND = 'COUNT_DOWN_ONE_SECOND'
export const COUNT_DOWN_FINISHED = 'COUNT_DOWN_FINISHED'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'

export const setTime = (time: Time) => action(SET_TIME, time)

export const startTimer = () => action(START_TIMER)

export const stopTimer = () => action(STOP_TIMER)

export const countDownOneSecond = () => action(COUNT_DOWN_ONE_SECOND)

export const countDownFinished = () => action(COUNT_DOWN_FINISHED)

export const addNotification = (notification: Notification) => action(ADD_NOTIFICATION, notification)

export type TimerActions = ActionType<
  typeof setTime &
    typeof startTimer &
    typeof stopTimer &
    typeof countDownOneSecond &
    typeof countDownFinished &
    typeof addNotification
>
