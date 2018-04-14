import { MiddlewareAPI } from 'redux'
import { ActionsObservable, combineEpics } from 'redux-observable'
import { IState } from '@state/index'
import {
  Actions,
  STOP_TIMER,
  COUNT_DOWN_ONE_SECOND,
  stopTimer,
  clearLoop,
  countDownFinished,
  COUNT_DOWN_FINISHED,
} from '@state/actions/timerActions'
import { setActiveNext } from '@state/actions/usersActions'

type stopTimerEpicType = ActionsObservable<Actions[typeof STOP_TIMER]>
type countDownFinishedEpicType = ActionsObservable<
  Actions[typeof COUNT_DOWN_ONE_SECOND]
>
type alertEpicType = ActionsObservable<
  Actions[typeof COUNT_DOWN_FINISHED]
>

export const stopTimerEpic = (
  action$: stopTimerEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(STOP_TIMER)
    .do(() => clearInterval(store.getState().timer.timerLoop))
    .mapTo(clearLoop())

export const countDownFinishedEpic = (
  action$: countDownFinishedEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(COUNT_DOWN_ONE_SECOND)
    .filter(() => {
      const { timeLeft } = store.getState().timer

      return timeLeft.minutes === 0 && timeLeft.seconds === 0
    })
    .mergeMap(() => [stopTimer(), setActiveNext(), countDownFinished()])

export const alertEpic = (
  action$: alertEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(COUNT_DOWN_FINISHED)
    .do(() => {
      const state = store.getState().users
      alert(`Time's up!\nUp next is ${state.list[state.activeUser]}!`)
    })
    .ignoreElements()

export const timerEpics = combineEpics(
  stopTimerEpic,
  countDownFinishedEpic as any,
  alertEpic
)
