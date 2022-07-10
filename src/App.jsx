
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { ContactEdit } from './pages/ContactEdit'
import { ContactDetails } from './pages/ContactDetails'
import { StatisticsPage } from './pages/StatisticsPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main className="container">
          <Switch>
            <Route path='/contact/edit/:id?' component={ContactEdit} />
            <Route path='/contact/:id' component={ContactDetails} />
            <Route path="/statistics" component={StatisticsPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
        <footer className="app-footer">
          <section className="container">
            &copy; Elana Hecht 2022
          </section>
        </footer>
      </div>
    </Router>
  )
}

export default App
