import { NavLink } from 'react-router-dom'

export function AppHeader() {
   return (
      <header className="app-header container">
         <div className="logo">
            <NavLink to="/"><b>Bit</b>coin</NavLink>
         </div>
         <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/contact">Contacts</NavLink>
            <NavLink to="/statistics">Statistics</NavLink>
         </nav>
      </header>
   )
}