import { action } from 'typesafe-actions'
import {
  ADD_NOTIFICATION,
  COUNT_DOWN_FINISHED,
  COUNT_DOWN_ONE_SECOND,
  SET_TIME,
  START_TIMER,
  STOP_TIMER,
} from '@state/actions/constants'
import { Time } from '../../time'

export const setTime = (time: Time) => action(SET_TIME, time)

export const startTimer = () => action(START_TIMER)

export const stopTimer = () => action(STOP_TIMER)

export const countDownOneSecond = () => action(COUNT_DOWN_ONE_SECOND)

export const countDownFinished = () => action(COUNT_DOWN_FINISHED)

export const addNotification = (notification: Notification) => action(ADD_NOTIFICATION, notification)
