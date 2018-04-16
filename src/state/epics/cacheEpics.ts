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

type cacheSaveSettingsEpicType = ActionsObservable<
  | timerActions[typeof SET_TIME]
  | userActions[
      | typeof ADD_USER
      | typeof REMOVE_USER
      | typeof SET_ORDER
      | typeof SET_ACTIVE]
>

const SAVE_TIMEOUT = 500
let saveTimer: number | null

export const cacheSaveSettingsEpic = (
  action$: cacheSaveSettingsEpicType,
  store: MiddlewareAPI<IState>
) =>
  action$
    .ofType(SET_TIME, ADD_USER, REMOVE_USER, SET_ORDER, SET_ACTIVE) // More?
    .do(() => {
      if (saveTimer) {
        clearTimeout(saveTimer)
      }

      const stateToSave: any = JSON.parse(JSON.stringify(store.getState()))
      stateToSave.timer.timeLeft = stateToSave.timer.duration
      stateToSave.timer.timerLoop = null

      saveTimer = window.setTimeout(() => {
        localStorage.setItem('cache', JSON.stringify(stateToSave))

        saveTimer = null
      }, SAVE_TIMEOUT)
    })
    .ignoreElements()

export const cacheEpics = combineEpics(cacheSaveSettingsEpic)
