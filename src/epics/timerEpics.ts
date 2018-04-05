import { MiddlewareAPI } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { STOP_TIMER } from '../actions/types'
import { startTimer, clearLoop } from '../actions/timerActions'
import { IState } from '../state'

type startTimerEpicType = ActionsObservable<ReturnType<typeof startTimer>>

export const startTimerEpic = (
  action$: startTimerEpicType,
  store: MiddlewareAPI<IState>
): any =>
  action$
    .ofType(STOP_TIMER)
    .do(() => clearInterval(store.getState().timer.timerLoop))
    .mapTo(clearLoop())
