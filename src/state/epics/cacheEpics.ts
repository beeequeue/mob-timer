import { combineEpics, Epic, ofType } from 'redux-observable'
import { ignoreElements, tap } from 'rxjs/operators'
import { ActionType } from 'typesafe-actions'
import { IState } from '@state/index'
import * as timerActions from '@state/actions/timerActions'
import * as userActions from '@state/actions/usersActions'
import {
  ADD_USER,
  REMOVE_USER,
  SET_ACTIVE,
  SET_ORDER,
  SET_TIME,
} from '@state/actions/constants'

type Actions = ActionType<typeof timerActions & typeof userActions>
type EpicType = Epic<Actions, Actions, IState>
const SAVE_TIMEOUT = 1000
let saveTimer: number | null

export const cacheSaveSettingsEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(SET_TIME, ADD_USER, REMOVE_USER, SET_ORDER, SET_ACTIVE), // More?
    tap(() => {
      if (saveTimer) {
        clearTimeout(saveTimer)
      }

      const stateToSave: any = JSON.parse(JSON.stringify(state$.value))
      stateToSave.timer.timeLeft = stateToSave.timer.duration
      stateToSave.timer.timerLoop = null

      saveTimer = window.setTimeout(() => {
        localStorage.setItem('cache', JSON.stringify(stateToSave))

        saveTimer = null
      }, SAVE_TIMEOUT)
    }),
    ignoreElements()
  )

export const cacheSaveNameEpic: EpicType = action$ =>
  action$.pipe(
    ofType(ADD_USER),
    tap(action => {
      const name = action.payload
      const names: string[] = JSON.parse(localStorage.getItem('names') || '[]')

      if (names.includes(name)) {
        names.splice(names.indexOf(name))
      }

      localStorage.setItem('names', JSON.stringify([name, ...names]))
    }),
    ignoreElements()
  )

export const cacheEpics = combineEpics(cacheSaveSettingsEpic, cacheSaveNameEpic)
