import { Component } from 'react';
import { ToDoList } from '../cmps/ToDoList';
import { ToDoFilter } from '../cmps/ToDoFilter';
import { loadToDos, removeToDo, updateToDo, setFilterBy } from '../store/actions/toDoActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class _ToDoApp extends Component {

   state = {
      filterBy: null,
      status: ''
   }

   async componentDidMount() {
      this.props.loadToDos();
   }

   onChangeFilter = async (filterBy) => {
      await this.props.setFilterBy(filterBy);
      this.props.loadToDos();
   };

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.value
      
      this.setState({ [field]: value }, () => {
          this.onChangeFilter(this.state)
      })
   }

   onRemoveToDo = async (toDoId) => {
      this.props.removeToDo(toDoId)
   }

   onCompleteToDo = async (toDo) => {
      toDo.isComplete = !toDo.isComplete
      this.props.updateToDo(toDo)
   }

   render() {
      const { toDos } = this.props
      const { status} = this.state
      if (!toDos) return <div>Loading...</div>
      return (
         <section className="todo-app">
            <h1>ToDo List</h1>
            <ToDoFilter onChangeFilter={this.onChangeFilter} />
            <main>
               <div className="todo-extras flex align-center space-between">
                  <Link className="add-btn simple-btn" to="/todo/edit" title="Add a new toDo">Add toDo</Link>
                  <div className="radio-btn" title="Select an option to filter toDo list">
                     <label htmlFor="all">
                        <input onChange={this.handleChange} type="radio" name="status" id="all" value="all" />
                        All</label>
                     <label htmlFor="active">
                        <input onChange={this.handleChange} type="radio" name="status" id="active" value="active" />
                        Active</label>
                     <label htmlFor="complete">
                        <input onChange={this.handleChange} type="radio" name="status" id="complete" value="complete" />
                        Complete</label>
                  </div>
                  <button className="clear-btn simple-btn" title="Remove all completed toDos">Clear complete</button>
                  {/* <div className="sort-todos">
                     <select name="sort" id="sort">
                        <option value="Text">Text</option>
                        <option value="DueDate">Due date</option>
                     </select>
                  </div> */}
               </div>
               <ToDoList onRemoveToDo={this.onRemoveToDo} onCompleteToDo={this.onCompleteToDo} toDos={toDos} />
            </main>
         </section>
      )
   }
}

const mapStateToProps = state => {
   return {
      toDos: state.toDoModule.toDos
   };
};

const mapDispatchToProps = {
   loadToDos,
   removeToDo,
   updateToDo,
   setFilterBy
}

export const ToDoApp = connect(
   mapStateToProps,
   mapDispatchToProps
)(_ToDoApp);
