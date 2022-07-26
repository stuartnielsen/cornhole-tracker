import React from 'react'
import reactDom from 'react-dom'
import App from './App'
import './index.css'

if (window.location.pathname === '/logout') {
  window.localStorage.clear()
}

reactDom.render(
  <>
    <App />
  </>,
  document.getElementById('root')
)
