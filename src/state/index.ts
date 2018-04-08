// tslint:disable:interface-over-type-literal
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mapTo'

import { timerReducers, IStateTimer } from '@state/reducers/timerReducers'
import { usersReducers, IStateUsers } from '@state/reducers/usersReducers'
import { stopTimerEpic, outOfTimeEpic } from '@state/epics/timerEpics'

declare module 'redux' {
  // tslint:disable:interface-name
  export interface Action {
    payload?: any | undefined | null
  }
}

const composeMiddleware =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type IState = {
  readonly timer: IStateTimer
  readonly users: IStateUsers
}

export const rootEpic = combineEpics(stopTimerEpic as any, outOfTimeEpic as any)

export const rootReducers = combineReducers({
  timer: timerReducers,
  users: usersReducers,
})

export const epicMiddleware = createEpicMiddleware(rootEpic)

export const store = createStore(
  rootReducers,
  composeMiddleware(applyMiddleware(epicMiddleware))
)
