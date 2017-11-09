import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dashboard from './pages/dashboard'

const App = () => (
  <MuiThemeProvider>
    <Dashboard />
  </MuiThemeProvider>
)

export default App
