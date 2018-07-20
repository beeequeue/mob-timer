import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import {
  combineEpics,
  createEpicMiddleware,
  Epic,
  ofType,
} from 'redux-observable'
import { takeUntil } from 'rxjs/operators'
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

const rootEpic: Epic = (action$, $state, dependencies) =>
  combineEpics(timerEpics, cacheEpics)(action$, $state, dependencies).pipe(
    takeUntil(action$.pipe(ofType('END')))
  )

const rootReducer = combineReducers({
  timer: timerReducers,
  users: usersReducers,
})

const epicMiddleware = createEpicMiddleware()
epicMiddleware.run(rootEpic)

export const store = createStore(
  rootReducer,
  composeMiddleware(applyMiddleware(epicMiddleware))
)
