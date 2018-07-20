import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css'
import './index.scss'

import { store, epicMiddleware } from '@state/index'
import { requestPermission } from './utils/notifications'
import { App } from './App'
// import { register as registerSW } from './registerServiceWorker'

requestPermission()

render(
  <Provider store={store}>
    <React.Fragment>
      <App />
    </React.Fragment>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

if ((module as any).hot) {
  ;(module as any).hot.accept('./App', () => {
    const { App: NextApp } = require('./App')

    render(
      <Provider store={store}>
        <React.Fragment>
          <NextApp />
        </React.Fragment>
      </Provider>,
      document.getElementById('root')
    )
  })
  ;(module as any).hot.accept('@state/index', () => {
    const { reducers: nextReducers, epics: nextEpics } = require('@state/index')

    store.replaceReducer(nextReducers)

    store.dispatch({ type: 'END' })
    epicMiddleware.run(nextEpics)
  })
}

// registerSW()
