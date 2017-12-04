import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import 'typeface-roboto'
import './index.css'
import App from './containers/App/App'
import registerServiceWorker from './registerServiceWorker'
import history from './history'
import Home from './pages/home'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(<Provider store={store}>
  <Router history={history} component={Home}>
    <App />
  </Router>
</Provider>,
document.getElementById('root'))
registerServiceWorker()
