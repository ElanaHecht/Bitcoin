import { Component } from 'react';
import { toDoService } from '../services/toDoService';
import { NiceButton } from "../cmps/NiceButton";
import { Link } from "react-router-dom";

export class ToDoDetails extends Component {
   state = {
      toDo: null
   }

   componentDidMount() {
      this.loadToDo()
   }

   async loadToDo() {
      const toDo = await toDoService.getById(this.props.match.params.id)
      this.setState({ toDo })
   }

   onBack = () => {
      this.props.history.push('/')
   }

   render() {
      const { toDo } = this.state
      if (!toDo) return <div>Loading...</div>
      const newDate = toDo.date.split('-')
      const currDate = new Date(newDate[0], newDate[1] - 1, newDate[2]);
      const date = `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`
      const createDate = new Date(toDo.createdAt)
      const created = `${createDate.getDate()}/${createDate.getMonth() + 1}/${createDate.getFullYear()}`
      return (
         <section className="todo-details">
               <h2 className='text-overflow'>{toDo.txt}</h2>
            <div className='details-container'>
               <p className='text-overflow'><span>Title:</span> {toDo.txt}</p>
               <p><span>Due date: </span>{date}</p>
               <p><span>Created: </span>{created}</p>
               <div className='detail-actions flex justify-center'>
                  <Link className='nice-button' to={`/todo/edit/${toDo.id}`}>Edit</Link>
                  <NiceButton onClick={this.onBack}>Back</NiceButton>
               </div>
            </div>
         </section>
      )
   }
}