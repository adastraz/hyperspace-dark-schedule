import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListGames from './components/ListGames.js'
import Game from './components/Game.js'
import CreateGame from './components/CreateGame.js'

const App = props => {
  return (
    <div>
      <CreateGame />
      <Switch>
        <Route path='/game/:id' component={Game} />
        <Route exact path='/' component={ListGames} />
      </Switch>
    </div>
  )
}

export default App