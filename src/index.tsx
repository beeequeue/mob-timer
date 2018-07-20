import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css'
import './index.scss'

import { store } from '@state/index'
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

// registerSW()
