import { Link } from "react-router-dom"

export function ToDoPreview({ toDo, onRemoveToDo }) {
   const current = new Date(toDo.date)
   const date = (typeof toDo.date === 'number') ? `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}` : toDo.date
   return (
      <section className="todo-preview p20">
         <div className="card-container">
            <ul className="clean-list">
               <li>
                  <Link to={`/todo/${toDo.id}`} className="todo-info">
                     <h2>{toDo.txt}</h2>
                     <p>{date}</p>
                  </Link>
                  <div>
                     <button onClick={() => onRemoveToDo(toDo.id)}>X</button>
                     <Link to={`/todo/edit/${toDo.id}`}></Link>
                  </div>
               </li>
            </ul>
         </div>
      </section>
   )
}