import React from 'react'
import { Route, Switch } from 'react-router'
import LoginForm from './components/LoginForm'
import AddService from './pages/add-service'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/"  component={LoginForm} />
        <Route exact path="/add-service" component={AddService}  />
      </Switch>
    </div>
  )
}

export default App
