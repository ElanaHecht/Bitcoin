import { Link } from "react-router-dom"

export function ContactPreview({ contact }) {
   return (
      <section className="contact-preview p20">
         <div className="card-container">
         <ul className="clean-list">
            <li>
               <Link to={`/contact/${contact._id}`} className="contact-info">
                  <h2>{contact.name}</h2>
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
               </Link>
            </li>
         </ul>
         </div>
      </section>
   )
}