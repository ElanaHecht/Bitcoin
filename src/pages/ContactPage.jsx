import { Component } from 'react';
import { contactService } from '../services/contactService';
import { ContactList } from "../cmps/ContactList";
import { ContactDetails } from "./ContactDetails";
import { ContactFilter } from '../cmps/ContactFilter';

export class ContactPage extends Component {
   state = {
      contacts: null,
      selectedContactId: null,
      filterBy: null
   }

   componentDidMount() {
      this.loadContacts()
   }

   async loadContacts() {
      const contacts = await contactService.getContacts(this.state.filterBy)
      this.setState({ contacts })
   }

   onSelectContact = (contactId) => {
      console.log('contact Id:', contactId);
      this.setState({ selectedContactId: contactId })
   }

   onChangeFilter = (filterBy) => {
      this.setState({ filterBy }, this.loadContacts)
   }

   render() {
      const { contacts, selectedContactId} = this.state
      if (!contacts) return <div>Loading...</div>
      return (
         <section className="contact-page">{
            selectedContactId ? 
            <ContactDetails contactId={selectedContactId} onBack={() => this.onSelectContact(null)}/> :
            <>
            <ContactFilter onChangeFilter={this.onChangeFilter}/>
            <ContactList contacts={contacts} onSelectContact={this.onSelectContact}/>
            </>
            }
         </section>
      )
   }
}