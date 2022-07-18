import { Component } from 'react';
import { Link } from 'react-router-dom';
import { toDoService } from '../services/toDoService';

export class ToDoEdit extends Component {
   state = {
      toDo: null
   }

   async componentDidMount() {
      const toDoId = this.props.match.params.id
      const toDo = toDoId ? await toDoService.getById(toDoId) : toDoService.getEmptyToDo()
      this.setState({toDo})
   }

   onSaveToDo = async (ev) => {
      ev.preventDefault()
      await toDoService.save({ ...this.state.toDo })
      this.props.history.push('/')
   }

   handleChange = async ({target}) => {
      const field = target.name;
      const value = target.type === 'number' ? (+target.value || '') : target.value;
      this.setState(prevState => ({ toDo: { ...prevState.toDo, [field]: value } }))
   }

   inputRef = (elInput) => {
      if (elInput) elInput.focus()
  }

   render() {
      const { toDo } = this.state
      if (!toDo) return <div>Loading...</div>
      return (
         <section className="todo-edit">
            <h1>{toDo.id ? 'Edit' : 'Add'} ToDo</h1>
            <form onSubmit={this.onSaveToDo}>
               <label htmlFor="text">
                  <input ref={this.inputRef} onChange={this.handleChange} type="text" id="text" name="text" value={toDo.txt} required />
               </label>
               <label htmlFor="date">
                  <input onChange={this.handleChange} type="date" id="date" name="date" value={toDo.date} />
               </label>
               <button>Save</button>
            </form>
            <Link to="/">Back</Link>
         </section>
      )
   }
}