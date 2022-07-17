import { toDoService } from "../../services/toDoService"

export function loadToDos() {
   return async (dispatch, getState) => {
      try {
         const {filterBy} = getState()
         const toDos = await toDoService.getToDos(filterBy)
         dispatch({ type: 'SET_TODOS', toDos });
      } catch (err) {
         console.log('err:', err);
      }
   }
}

export function removeToDo(toDoId) {
   return async (dispatch) => {
      try {
         await toDoService.deleteToDo(toDoId)
         dispatch({ type: 'SET_TODOS', toDoId });
      } catch (err) {
         console.log('err:', err);
      }
   }
}

export function setFilterBy(filterBy) {
   return async (dispatch) => {
      dispatch({ type: 'SET_FILTER_BY', filterBy });
   }
}