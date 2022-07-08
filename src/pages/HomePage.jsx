import { Component } from 'react';
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'

export class HomePage extends Component {
   state = {
      user: null,
      rate: null
   }

   componentDidMount() {
      this.loadUser()
      this.loadRate()
   }

   async loadUser() {
      const user = await userService.getUser()
      this.setState({ user })
   }

   async loadRate() {
      const rate = await bitcoinService.getRate('USD', 1)
      this.setState({ rate })
   }

   render() {
      const { user, rate } = this.state
      if (!user) return <div>Loading...</div>
      return (
         <section className="home-page">
            <div className="user-info">
               <h1>Name: <b>{user.name}</b></h1>
               <h1>Coins: <b>{user.coins}</b></h1>
               <h1>Current rate: <b>{rate}</b></h1>
            </div>
         </section>
      )
   }
}