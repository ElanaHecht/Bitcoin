import { toDoService } from "../../services/toDoService"

export function loadToDos() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().toDoModule
            const toDos = await toDoService.query(filterBy)
            dispatch({ type: 'SET_TODOS', toDos })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function removeToDo(toDoId) {
    return async (dispatch) => {
        try {
            await toDoService.remove(toDoId)
            dispatch({ type: 'REMOVE_TODO', toDoId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}