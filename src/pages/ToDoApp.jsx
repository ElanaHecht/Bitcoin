import { Component } from 'react';
import { ToDoList } from '../cmps/ToDoList';
import { ToDoFilter } from '../cmps/ToDoFilter';
import { loadToDos, removeToDo, setFilterBy } from '../store/actions/toDoActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class _ToDoApp extends Component {

   async componentDidMount() {      
      this.props.loadToDos();    
   }

   onChangeFilter = async (filterBy) => {
      await this.props.setFilterBy(filterBy);
      this.props.loadToDos();
   };

   onRemoveToDo = async (toDoId) => {
      this.props.removeToDo(toDoId)
  }

   render() {
      const { toDos } = this.props
      if (!toDos) return <div>Loading...</div>
      return (
         <section className="todo-app">
            <ToDoFilter onChangeFilter={this.onChangeFilter} />
            <Link className="add-btn" to="/todo/edit">Add toDo</Link>
            <ToDoList onRemoveToDo={this.onRemoveToDo} toDos={toDos} />
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
   setFilterBy
}

export const ToDoApp = connect(
   mapStateToProps,
   mapDispatchToProps
)(_ToDoApp);
