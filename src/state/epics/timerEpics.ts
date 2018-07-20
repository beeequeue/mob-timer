import { combineEpics, Epic, ofType } from 'redux-observable'
import { interval } from 'rxjs'
import { filter, flatMap, mapTo, mergeMap, switchMap, takeUntil } from 'rxjs/operators'
import { ActionType } from 'typesafe-actions'

import { IState } from '@state/index'
import * as timerActions from '@state/actions/timerActions'
import { setActiveNext } from '@state/actions/usersActions'
import { COUNT_DOWN_FINISHED, COUNT_DOWN_ONE_SECOND, START_TIMER, STOP_TIMER } from '@state/actions/constants'

import { notify } from '../../utils/notifications'
import timer from '../../assets/timer.svg'
import { addNotification } from '@state/actions/timerActions'

type Actions = ActionType<typeof timerActions>
type EpicType = Epic<Actions, any, IState>
const { stopTimer, countDownFinished, countDownOneSecond } = timerActions

export const startTimerEpic: EpicType = action$ =>
  action$.pipe(
    ofType(START_TIMER),
    switchMap(() =>
      interval(1000).pipe(
        takeUntil(action$.ofType(STOP_TIMER)),
        mapTo(countDownOneSecond())
      )
    )
  )

export const countDownFinishedEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(COUNT_DOWN_ONE_SECOND),
    filter(() => {
      const { timeLeft } = state$.value.timer

      return timeLeft.minutes === 0 && timeLeft.seconds === 0
    }),
    mergeMap(() => [stopTimer(), setActiveNext(), countDownFinished()])
  )

export const alertEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(COUNT_DOWN_FINISHED),
    flatMap(() => {
      const state = state$.value.users
      const nextUser = state.list[state.activeUser]

      return [
        notify("Time's up!", {
          body: nextUser && `${nextUser} is up next!`,
          badge: timer,
          icon: timer,
          vibrate: [2000, 2000, 2000],
        }),
      ]
    }),
    mergeMap(n => [addNotification(n)])
  )

export const timerEpics = combineEpics(
  startTimerEpic,
  countDownFinishedEpic,
  alertEpic
)
