import React from 'react'
import './assets/scss/global.scss'
import { BitcoinApp } from './pages/BitcoinApp';

export class App extends React.Component {

  render() {
    return (
      <div className="app">
        <main>
          <BitcoinApp />
        </main>
      </div>
    )
  }
}

export default App
