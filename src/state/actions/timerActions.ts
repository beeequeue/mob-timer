import { createStandardAction } from 'typesafe-actions'
import {
  ADD_NOTIFICATION,
  COUNT_DOWN_FINISHED,
  COUNT_DOWN_ONE_SECOND,
  SET_TIME,
  START_TIMER,
  STOP_TIMER,
} from '@state/actions/constants'
import { Time } from '../../time'

export const setTime = createStandardAction(SET_TIME)<Time>()

export const startTimer = createStandardAction(START_TIMER)()

export const stopTimer = createStandardAction(STOP_TIMER)()

export const countDownOneSecond = createStandardAction(COUNT_DOWN_ONE_SECOND)()

export const countDownFinished = createStandardAction(COUNT_DOWN_FINISHED)()

export const addNotification = createStandardAction(ADD_NOTIFICATION)<Notification>()
