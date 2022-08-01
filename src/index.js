import React from 'react'
import reactDom from 'react-dom'
import GamePage from './Components/GamePage'
import SetupGame from './Components/SetupGame'
import './index.css'

if (window.location.pathname === '/logout') {
  window.localStorage.clear()
}

reactDom.render(
  <>
    <SetupGame />
  </>,
  document.getElementById('root')
)
