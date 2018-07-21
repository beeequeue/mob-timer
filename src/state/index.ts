import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable'
import { ActionType, StateType } from 'typesafe-actions'

import { timerReducers } from '@state/reducers/timerReducers'
import { usersReducers } from '@state/reducers/usersReducers'
import { timerEpics } from '@state/epics/timerEpics'
import { cacheEpics } from '@state/epics/cacheEpics'
import * as timerActions from '@state/actions/timerActions'
import * as usersActions from '@state/actions/usersActions'

const composeMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type IRootState = StateType<typeof rootReducer>
export type IRootActions = ActionType<typeof timerActions & typeof usersActions>

const rootEpic: Epic = combineEpics(timerEpics, cacheEpics)

const rootReducer = combineReducers({
  timer: timerReducers,
  users: usersReducers,
})

export const epicMiddleware = createEpicMiddleware()

export const store = createStore(
  rootReducer,
  composeMiddleware(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic)
