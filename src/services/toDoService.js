export const toDoService =  {
   getToDos,
   getToDoById,
   deleteToDo,
   saveToDo,
   getEmptyToDo
 }
 
 
 
 const toDos = [
   {
     "id": "5a56640269f443a5d64b32ca",
     "txt": "Learn about toDo lists",
     "createdAt": "1658058949000",
     "date": "1658058949000"
   },
   {
     "id": "5a5664025f6ae9aa24a99fde",
     "name": "Create toDo list",
     "createdAt": "1658058949000",
     "date": "657972549000"
   },
   {
     "id": "5a56640252d6acddd183d319",
     "name": "Design toDo list",
     "createdAt": "1658058949000",
     "date": "1658058949000"
   }
 ];
 
 function sort(arr) {
   return arr.sort((a, b) => {
     if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
       return -1;
     }
     if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
       return 1;
     }
 
     return 0;
   })
 }
 
 function getToDos(filterBy = null) {

   return new Promise((resolve, reject) => {
     let toDosToReturn = toDos;
     if (filterBy && filterBy.term) {
       toDosToReturn = filter(filterBy.term)
     }
     resolve(sort(toDosToReturn))
   })
 }
 
 function getToDoById(id) {
   return new Promise((resolve, reject) => {
     const toDo = toDos.find(toDo => toDo.id === id)
     toDo ? resolve(toDo) : reject(`ToDo id ${id} not found!`)
   })
 }
 
 function deleteToDo(id) {
   return new Promise((resolve, reject) => {
     const index = toDos.findIndex(toDo => toDo.id === id)
     if (index !== -1) {
       toDos.splice(index, 1)
     }
 
     resolve(toDos)
   })
 }
 
 function _updateToDo(toDo) {
   return new Promise((resolve, reject) => {
     const index = toDos.findIndex(c => toDo.id === c.id)
     if (index !== -1) {
       toDos[index] = toDo
     }
     resolve(toDo)
   })
 }
 
 function _addToDo(toDo) {
   return new Promise((resolve, reject) => {
     toDo.id = _makeId()
     toDos.push(toDo)
     resolve(toDo)
   })
 }
 
 function saveToDo(toDo) {
   return toDo.id ? _updateToDo(toDo) : _addToDo(toDo)
 }
 
 function getEmptyToDo() {
   return {
     txt: '',
     createdAt: new Date(),
     date: 0

   }
 }
 
 function filter(term) {
   term = term.toLocaleLowerCase()
   return toDos.filter(toDo => {
     return toDo.txt.toLocaleLowerCase().includes(term)
   })
 }
 
 
 
 function _makeId(length = 10) {
   let txt = ''
   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   for (let i = 0; i < length; i++) {
     txt += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return txt
 }