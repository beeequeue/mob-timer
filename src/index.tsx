import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { App } from './App'
import { reducers, epics } from './state'
// import { register as registerSW } from './registerServiceWorker'
import 'normalize.css'

const composeMiddleware =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeMiddleware(applyMiddleware(epics)))

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

// registerSW()
