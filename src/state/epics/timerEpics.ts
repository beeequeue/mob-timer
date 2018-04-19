import { MiddlewareAPI } from 'redux'
import { ActionsObservable, combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { IState } from '@state/index'
import {
  Actions,
  START_TIMER,
  STOP_TIMER,
  COUNT_DOWN_ONE_SECOND,
  COUNT_DOWN_FINISHED,
  stopTimer,
  countDownOneSecond,
  countDownFinished,
} from '@state/actions/timerActions'
import { setActiveNext } from '@state/actions/usersActions'
import { notify } from '../../utils/notifications'
import timer from '../../assets/timer.svg'

type startTimerEpicType = ActionsObservable<Actions[typeof START_TIMER]>
type countDownFinishedEpicType = ActionsObservable<
  Actions[typeof COUNT_DOWN_ONE_SECOND]
>
type alertEpicType = ActionsObservable<Actions[typeof COUNT_DOWN_FINISHED]>

export const startTimerEpic = (
  action$: startTimerEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$.ofType(START_TIMER).switchMap(() =>
    Observable.interval(1000)
      .takeUntil(action$.ofType(STOP_TIMER))
      .mapTo(countDownOneSecond())
  )

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

      notify("Time's up!", {
        body: `${state.list[state.activeUser]} is up next!`,
        badge: timer,
        icon: timer,
        vibrate: [2000, 2000, 2000],
      })

      alert(`Time's up!\n${state.list[state.activeUser]} is up next!`)
    })
    .ignoreElements()

export const timerEpics = combineEpics(
  startTimerEpic,
  countDownFinishedEpic as any,
  alertEpic
)
