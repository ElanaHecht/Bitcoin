import { Link } from "react-router-dom"

export function ToDoPreview({ toDo }) {
   return (
      <section className="todo-preview p20">
         <div className="card-container">
         <ul className="clean-list">
            <li>
               <Link to={`/todo/${toDo.id}`} className="todo-info">
                  <h2>{toDo.name}</h2>
                  <p>{toDo.email}</p>
                  <p>{toDo.phone}</p>
               </Link>
            </li>
         </ul>
         </div>
      </section>
   )
}