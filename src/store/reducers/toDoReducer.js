const INITIAL_STATE = {
   toDos: null,
   filterBy: null
}

export function toDoReducer(state = INITIAL_STATE, action) {

   switch (action.type) {
      case 'SET_TODOS':
         return {
            ...state,
            toDos: action.toDos
         };
      case 'ADD_TODO':
         return {
            ...state,
            toDos: [...state.toDos, action.toDo]
         };
      case 'UPDATE_TODO':
         return {
            ...state,
            toDos: state.toDos.map(toDo => toDo.id === action.toDo.id ? action.toDo : toDo)
         };
      case 'REMOVE_TODO':
         return {
            ...state,
            toDos: state.toDos.filter(toDo => toDo.id !== action.toDoId)
         };
      case 'SET_FILTER_BY':        
         return {
            ...state,
            filterBy: {...action.filterBy}
         };

      default:
         return state;
   }
}