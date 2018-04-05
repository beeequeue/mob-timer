import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import 'rxjs'

import { timerReducers, IStateTimer } from './reducers/timerReducers'
import { startTimerEpic, outOfTimeEpic } from './epics/timerEpics'

declare module 'redux' {
  // tslint:disable:interface-name
  export interface Action {
    payload?: any | undefined | null
  }
}

export interface IState {
  timer: IStateTimer
}

export const epics = combineEpics(startTimerEpic, outOfTimeEpic)

export const reducers = combineReducers({ timer: timerReducers })
