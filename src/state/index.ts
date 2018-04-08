import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import 'rxjs'

import { timerReducers, IStateTimer } from '@state/reducers/timerReducers'
import { usersReducers, IStateUsers } from '@state/reducers/usersReducers'
import { startTimerEpic, outOfTimeEpic } from '@state/epics/timerEpics'

declare module 'redux' {
  // tslint:disable:interface-name
  export interface Action {
    payload?: any | undefined | null
  }
}

export interface IState {
  timer: IStateTimer
  users: IStateUsers
}

export const epics = combineEpics(startTimerEpic, outOfTimeEpic)

export const reducers = combineReducers({
  timer: timerReducers,
  users: usersReducers,
})
