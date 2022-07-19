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
      return (
         <section className="todo-details">
            <h2>{toDo.txt}</h2>
            <p>{toDo.date}</p>
            <div className='actions'>
               <button className='simple-btn' onClick={this.onBack}>Back</button>
               <NiceButton><Link className='simple-btn' to={`/todo/edit/${toDo.id}`}>Edit</Link></NiceButton>
            </div>
         </section>
      )
   }
}