import { MiddlewareAPI } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { IState } from '@state/index'
import {
  Actions,
  STOP_TIMER,
  COUNT_DOWN_ONE_SECOND,
  stopTimer,
  clearLoop,
} from '@state/actions/timerActions'

type stopTimerEpicType = ActionsObservable<Actions[typeof STOP_TIMER]>
type countDownOneSecondEpicType = ActionsObservable<
  Actions[typeof COUNT_DOWN_ONE_SECOND]
>

export const stopTimerEpic = (
  action$: stopTimerEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(STOP_TIMER)
    .do(() => clearInterval(store.getState().timer.timerLoop))
    .mapTo(clearLoop())

export const outOfTimeEpic = (
  action$: countDownOneSecondEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(COUNT_DOWN_ONE_SECOND)
    .filter(() => {
      const { timeLeft } = store.getState().timer

      return timeLeft.minutes === 0 && timeLeft.seconds === 0
    })
    .mapTo(stopTimer())
