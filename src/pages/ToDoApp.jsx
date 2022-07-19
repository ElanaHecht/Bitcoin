import { Component } from 'react';
import { ToDoList } from '../cmps/ToDoList';
import { ToDoFilter } from '../cmps/ToDoFilter';
import { ListHeader } from '../cmps/ListHeader';
import { loadToDos, removeToDo, updateToDo, setFilterBy } from '../store/actions/toDoActions';
import { connect } from 'react-redux';

class _ToDoApp extends Component {

   state = {
      filterBy: null,
   }

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

   onRemoveComplete = async () => {
      this.props.toDos.forEach(toDo => {
         if (toDo.isComplete) this.props.removeToDo(toDo.id)
      })
   }

   onCompleteToDo = async (toDo) => {
      toDo.isComplete = !toDo.isComplete
      this.props.updateToDo(toDo)
   }

   render() {
      const { toDos } = this.props
      if (!toDos) return <div>Loading...</div>
      return (
         <section className="todo-app">
            <h1>ToDo List</h1>
            <ToDoFilter onChangeFilter={this.onChangeFilter} />
            <main>
               <ListHeader onRemoveComplete={this.onRemoveComplete} onChangeFilter={this.onChangeFilter}/>
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
