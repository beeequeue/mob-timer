import { MiddlewareAPI } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { STOP_TIMER, COUNT_DOWN_ONE_SECOND } from '@state/actions/types'
import { startTimer, stopTimer, clearLoop } from '@state/actions/timerActions'
import { IState } from '@state/index'

type startTimerEpicType = ActionsObservable<ReturnType<typeof startTimer>>

export const startTimerEpic = (
  action$: startTimerEpicType,
  store: MiddlewareAPI<IState>
): any =>
  action$
    .ofType(STOP_TIMER)
    .do(() => clearInterval(store.getState().timer.timerLoop))
    .mapTo(clearLoop())

export const outOfTimeEpic = (
  action$: startTimerEpicType,
  store: MiddlewareAPI<IState>
): any =>
  action$
    .ofType(COUNT_DOWN_ONE_SECOND)
    .filter(() => {
      const { timeLeft } = store.getState().timer

      return timeLeft.minutes === 0 && timeLeft.seconds === 0
    })
    .mapTo(stopTimer())
