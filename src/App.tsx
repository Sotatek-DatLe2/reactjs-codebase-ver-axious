import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'src/routes/index.routes'
import rootStore from './stores/root-store'

export default function App() {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}
