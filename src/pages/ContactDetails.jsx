import { Component } from 'react';
import { contactService } from '../services/contactService';

export class ContactDetails extends Component {
   state = {
      contact: null
   }

   componentDidMount() {
      this.getContact()
   }

   async getContact() {
      const contact = await contactService.getContactById(this.props.contactId)
      this.setState({ contact })
   }

   render() {
      const { contact } = this.state
      if (!contact) return <div>Loading...</div>
      return (
         <section className="contact-details">
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <div>
               <button onClick={this.props.onBack}>Back</button>
            </div>
         </section>
      )
   }
}