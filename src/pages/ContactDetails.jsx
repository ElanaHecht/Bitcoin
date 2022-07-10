import { Component } from 'react';
import { contactService } from '../services/contactService';
import { Link } from "react-router-dom";

export class ContactDetails extends Component {
   state = {
      contact: null
   }

   componentDidMount() {
      this.loadContact()
   }

   // componentDidUpdate(prevProps, prevState) {
   //    if (prevProps.match.params.id !== this.props.match.params.id) {
   //       this.loadContact()
   //    }
   // }

   async loadContact() {
      const contact = await contactService.getContactById(this.props.match.params.id)
      this.setState({ contact })
   }

   onBack = () => {
      this.props.history.push('/contacts')
   }

   render() {
      const { contact } = this.state
      if (!contact) return <div>Loading...</div>
      return (
         <section className="contact-details">
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <div className='actions'>
               <button onClick={this.onBack}>Back</button>
               <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
            </div>
         </section>
      )
   }
}