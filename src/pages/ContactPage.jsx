import { Component } from 'react';
import { contactService } from '../services/contactService';
import { ContactList } from "../cmps/ContactList";
import { ContactFilter } from '../cmps/ContactFilter';
import { Link } from 'react-router-dom'

export class ContactPage extends Component {
   state = {
      contacts: null,
      filterBy: null
   }

   componentDidMount() {
      this.loadContacts()
   }

   async loadContacts() {
      const contacts = await contactService.getContacts(this.state.filterBy)
      this.setState({ contacts })
   }

   onChangeFilter = (filterBy) => {
      this.setState({ filterBy }, this.loadContacts)
   }

   render() {
      const { contacts} = this.state
      if (!contacts) return <div>Loading...</div>
      return (
         <section className="contact-page">
            <ContactFilter onChangeFilter={this.onChangeFilter}/>
            <ContactList contacts={contacts}/>
            <Link className="add-btn" to="/contact/edit">Add contact</Link>
         </section>
      )
   }
}