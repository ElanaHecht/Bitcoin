import { Component } from 'react';
import { toDoService } from '../services/toDoService';
import { Link } from "react-router-dom";

export class ToDoDetails extends Component {
   state = {
      toDo: null
   }

   componentDidMount() {
      this.loadToDo()
   }

   async loadToDo() {
      const toDo = await toDoService.getToDoById(this.props.match.params.id)
      this.setState({ toDo })
   }

   onBack = () => {
      this.props.history.push('/todos')
   }

   render() {
      const { toDo } = this.state
      if (!toDo) return <div>Loading...</div>
      return (
         <section className="todo-details">
            <h2>{toDo.name}</h2>
            <p>{toDo.email}</p>
            <p>{toDo.phone}</p>
            <div className='actions'>
               <button onClick={this.onBack}>Back</button>
               <Link to={`/todo/edit/${toDo.id}`}>Edit</Link>
            </div>
         </section>
      )
   }
}