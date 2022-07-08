
export function ContactPreview({ contact, onSelectContact }) {
   return (
      <section className="contact-preview p20">
         <div className="card-container" onClick={() => onSelectContact(contact._id)}>
         <ul className="clean-list">
            <li>
               <div className="contact-info">
                  <h2>{contact.name}</h2>
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
               </div>
            </li>
         </ul>
         </div>
      </section>
   )
}