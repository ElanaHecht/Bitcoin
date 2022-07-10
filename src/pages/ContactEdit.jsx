import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../services/contactService';

export class ContactEdit extends Component {
   state = {
      contact: null
   }

   inputRef = createRef()

   async componentDidMount() {
      const contactId = this.props.match.params.id
      const contact = contactId ? await contactService.getContactById(contactId) : contactService.getEmptyContact()
        this.setState({ contact }, ()=>{
            this.inputRef.current.focus()
        })
   }

   onSaveContact = async (ev) => {
      ev.preventDefault()
      await contactService.saveContact({ ...this.state.contact })
      this.props.history.push('/contact')
   }

   onRemoveContact = async () => {
      await contactService.deleteContact(this.state.contact._id)
      this.props.history.push('/contact')
   }

   handleChange = async ({target}) => {
      const field = target.name;
      const value = target.type === 'number' ? (+target.value || '') : target.value;
      this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
   }

   render() {
      const { contact } = this.state
      if (!contact) return <div>Loading...</div>
      return (
         <section className="contact-edit">
            <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
            <form onSubmit={this.onSaveContact}>
               <label htmlFor="name">
                  <input ref={this.inputRef} onChange={this.handleChange} type="text" id="name" name="name" value={contact.name} required />
               </label>
               <label htmlFor="email">
                  <input onChange={this.handleChange} type="email" id="email" name="email" value={contact.email} required />
               </label>
               <label htmlFor="phone">
                  <input onChange={this.handleChange} type="tel" id="phone" name="phone" value={contact.phone} required />
               </label>
               <button>Save</button>
            </form>
            <Link to="/contact">Back</Link>
            {contact._id && <button onClick={this.onRemoveContact}>Delete</button>}
         </section>
      )
   }
}