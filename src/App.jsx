
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { ToDoEdit } from './pages/ToDoEdit'
import { ToDoDetails } from './pages/ToDoDetails'
import { ToDoApp } from './pages/ToDoApp'

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main className="container">
          <Switch>
            <Route path='/todo/edit/:id?' component={ToDoEdit} />
            <Route path='/todo/:id' component={ToDoDetails} />
            <Route path="/todo" component={ToDoApp} />
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
