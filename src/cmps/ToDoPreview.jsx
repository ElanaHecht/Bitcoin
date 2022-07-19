import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from '../assets/images/edit.svg'
import { ReactComponent as CheckIcon } from '../assets/images/check.svg'

export function ToDoPreview({ toDo, onRemoveToDo, onCompleteToDo }) {
   const current = new Date(toDo.date)
   const date = (typeof toDo.date === 'number') ? `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}` : toDo.date
const strikeThrough = toDo.isComplete ? 'text-strike' : null
   return (
      <section className="todo-preview p20">
         <div className="card-container flex align-center space-between">
            <div className="todo-card flex align-center">
               <button onClick={() => onCompleteToDo(toDo)} className={toDo.isComplete ? 'complete' : null} title="Click when ToDo is completed">{toDo.isComplete ? <CheckIcon /> : ''}</button>
               <Link to={`/todo/${toDo.id}`} className="todo-info">
                  <h2 className={strikeThrough} title="ToDo title">{toDo.txt} </h2>
                  <p className={strikeThrough} title="ToDo due-date">Due: {date}</p>
               </Link>
            </div>
            <div className="todo-actions">
               <Link to={`/todo/edit/${toDo.id}`}>
                  <EditIcon className="edit-icon" title="Edit this toDo"/>
               </Link>
               <button onClick={() => onRemoveToDo(toDo.id)} title="Remove this toDo">X</button>
            </div>
         </div>
      </section>
   )
}