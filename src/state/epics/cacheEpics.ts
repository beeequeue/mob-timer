import { MiddlewareAPI } from 'redux'
import { ActionsObservable, combineEpics } from 'redux-observable'
import { IState } from '@state/index'
import { Actions as timerActions, SET_TIME } from '@state/actions/timerActions'
import {
  Actions as userActions,
  ADD_USER,
  REMOVE_USER,
  SET_ORDER,
  SET_ACTIVE,
} from '@state/actions/usersActions'

type stopTimerEpicType = ActionsObservable<
  | timerActions[typeof SET_TIME]
  | userActions[
      | typeof ADD_USER
      | typeof REMOVE_USER
      | typeof SET_ORDER
      | typeof SET_ACTIVE]
>

const SAVE_TIMEOUT = 1500
let saveTimer: number | null

export const cacheSaveSettingsEpic = (
  action$: stopTimerEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(SET_TIME, ADD_USER, REMOVE_USER, SET_ORDER, SET_ACTIVE) // More?
    .do(() => {
      if (saveTimer) {
        clearTimeout(saveTimer)
      }

      saveTimer = window.setTimeout(() => {
        localStorage.setItem('cache', JSON.stringify(store.getState()))

        saveTimer = null
      }, SAVE_TIMEOUT)
    })
    .ignoreElements()

export const cacheEpics = combineEpics(cacheSaveSettingsEpic)
