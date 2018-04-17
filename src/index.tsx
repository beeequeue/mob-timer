import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { DragDropContextProvider as DnDCProvider } from 'react-dnd'
import * as HTML5Backend from 'react-dnd-html5-backend'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/ignoreElements'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/interval'

import 'normalize.css'
import './index.scss'

import { store, epicMiddleware } from '@state/index'
import { App } from './App'
// import { register as registerSW } from './registerServiceWorker'

render(
  <Provider store={store}>
    <DnDCProvider backend={HTML5Backend}>
      <React.Fragment>
        <App />
      </React.Fragment>
    </DnDCProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

if ((module as any).hot) {
  ;(module as any).hot.accept('./App', () => {
    const { App: NextApp } = require('./App')

    render(
      <Provider store={store}>
        <DnDCProvider backend={HTML5Backend}>
          <React.Fragment>
            <NextApp />
          </React.Fragment>
        </DnDCProvider>
      </Provider>,
      document.getElementById('root')
    )
  })
  ;(module as any).hot.accept('@state/index', () => {
    const { reducers: nextReducers, epics: nextEpics } = require('@state/index')

    store.replaceReducer(nextReducers)
    epicMiddleware.replaceEpic(nextEpics)
  })
}

// registerSW()
