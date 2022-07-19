import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from '../assets/images/edit.svg'
import { ReactComponent as CheckIcon } from '../assets/images/check.svg'

export function ToDoPreview({ toDo, onRemoveToDo, onCompleteToDo }) {
   const newDate = toDo.date.split('-')
   const currDate = new Date(newDate[0], newDate[1] - 1, newDate[2]);
   const date = `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`
   const strikeThrough = toDo.isComplete ? 'text-strike' : '';
   const month = new Date().getMonth() + 1
   const dateNow = `${new Date().getFullYear()}-${(month > 10) ? month : '0' + month}-${new Date().getDate()}`
   const overDue = (date < dateNow) ? 'over-due' : ''
   return (
      <section className="todo-preview p20">
         <div className="card-container flex align-center space-between">
            <div className="todo-card flex align-center">
               <button onClick={() => onCompleteToDo(toDo)} className={toDo.isComplete ? 'complete' : null} title="Click when ToDo is completed">{toDo.isComplete ? <CheckIcon /> : ''}</button>
               <Link to={`/todo/${toDo.id}`} className="todo-info">
                  <h2 className={`${strikeThrough} text-overflow`} title="ToDo title">{toDo.txt} </h2>
                  <p className={`${strikeThrough} ${overDue}`} title="ToDo due-date">Due: {date} </p>
               </Link>
            </div>
            <div className="todo-actions">
               <Link to={`/todo/edit/${toDo.id}`}>
                  <EditIcon className="edit-icon" title="Edit this toDo" />
               </Link>
               <button onClick={() => onRemoveToDo(toDo.id)} title="Remove this toDo">✖</button>
            </div>
         </div>
      </section>
   )
}