import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { toDoService } from '../services/toDoService';

export class ToDoEdit extends Component {
   state = {
      toDo: null
   }

   inputRef = createRef()

   async componentDidMount() {
      const toDoId = this.props.match.params.id
      const toDo = toDoId ? await toDoService.getToDoById(toDoId) : toDoService.getEmptyToDo()
        this.setState({ toDo }, ()=>{
            this.inputRef.current.focus()
        })
   }

   onSaveToDo = async (ev) => {
      ev.preventDefault()
      await toDoService.saveToDo({ ...this.state.toDo })
      this.props.history.push('/todo')
   }

   onRemoveToDo = async () => {
      await toDoService.deleteToDo(this.state.toDo.id)
      this.props.history.push('/todo')
   }

   handleChange = async ({target}) => {
      const field = target.name;
      const value = target.type === 'number' ? (+target.value || '') : target.value;
      this.setState(prevState => ({ toDo: { ...prevState.toDo, [field]: value } }))
   }

   render() {
      const { toDo } = this.state
      if (!toDo) return <div>Loading...</div>
      return (
         <section className="todo-edit">
            <h1>{toDo.id ? 'Edit' : 'Add'} ToDo</h1>
            <form onSubmit={this.onSaveToDo}>
               <label htmlFor="text">
                  <input ref={this.inputRef} onChange={this.handleChange} type="text" id="text" name="text" value={toDo.name} required />
               </label>
               <label htmlFor="date">
                  <input onChange={this.handleChange} type="date" id="date" name="date" value={toDo.email} required />
               </label>
               <button>Save</button>
            </form>
            <Link to="/todo">Back</Link>
            {toDo.id && <button onClick={this.onRemoveToDo}>Delete</button>}
         </section>
      )
   }
}