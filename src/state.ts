import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { combineReducers } from 'redux'
import 'rxjs'

import { timerReducers } from './reducers/timer'

declare module 'redux' {
  // tslint:disable:interface-name
  export interface Action {
    payload: any | undefined | null
  }
}

export const epics = createEpicMiddleware(combineEpics())

export const reducers = combineReducers({ timer: timerReducers })
