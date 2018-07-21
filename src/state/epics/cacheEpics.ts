import { combineEpics, Epic } from 'redux-observable'
import { filter, ignoreElements, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

import { IRootActions, IRootState } from '@state/index'
import { setTime } from '@state/actions/timerActions'
import {
  addUser,
  removeUser,
  setActive,
  setOrder,
} from '@state/actions/usersActions'

type EpicType = Epic<IRootActions, IRootActions, IRootState>
const SAVE_TIMEOUT = 1000
let saveTimer: number | null

export interface ICachedState {
  timer: {
    timeLeft: {
      minutes: number
      seconds: number
    }
    duration: {
      minutes: number
      seconds: number
    }
  }
  users: {
    list: string[]
    activeUser: number
  }
}

export const cacheSaveSettingsEpic: EpicType = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([setTime, addUser, removeUser, setOrder, setActive])), // More?
    tap(() => {
      if (saveTimer) {
        clearTimeout(saveTimer)
      }

      const state = state$.value
      const stateToSave: ICachedState = {
        timer: {
          // Set time left to duration so when people refresh page
          // the timer has reset
          timeLeft: state.timer.duration,
          duration: state.timer.duration,
        },
        users: {
          list: state.users.list as string[],
          activeUser: state.users.activeUser,
        },
      }

      saveTimer = window.setTimeout(() => {
        localStorage.setItem('cache', JSON.stringify(stateToSave))

        saveTimer = null
      }, SAVE_TIMEOUT)
    }),
    ignoreElements()
  )

export const cacheSaveNameEpic: EpicType = action$ =>
  action$.pipe(
    filter(isActionOf(addUser)),
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
