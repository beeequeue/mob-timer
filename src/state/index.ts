// tslint:disable:interface-over-type-literal
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import { timerReducers, IStateTimer } from '@state/reducers/timerReducers'
import { usersReducers, IStateUsers } from '@state/reducers/usersReducers'
import { timerEpics } from '@state/epics/timerEpics'
import { cacheEpics } from '@state/epics/cacheEpics'

const composeMiddleware =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type IState = {
  readonly timer: IStateTimer
  readonly users: IStateUsers
}

export const rootEpic = combineEpics(timerEpics, cacheEpics)

export const rootReducers = combineReducers({
  timer: timerReducers,
  users: usersReducers,
})

export const epicMiddleware = createEpicMiddleware(rootEpic)

export const store = createStore(
  rootReducers,
  composeMiddleware(applyMiddleware(epicMiddleware))
)
