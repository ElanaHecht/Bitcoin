import { storageService } from "./storageService";
export const toDoService = {
  query,
  getById,
  remove,
  save,
  getEmptyToDo
}


const STORAGE_KEY = 'toDoDB'
const toDos = [
  {
    id: "5a56640269f443a5d64b32ca",
    txt: "Learn about toDo lists",
    isComplete: false,
    createdAt: 1658058949000,
    date: 1657858949000
  },
  {
    id: "5a5664025f6ae9aa24a99fde",
    txt: "Create toDo list",
    isComplete: false,
    createdAt: 1658058949000,
    date: 1657972549000
  },
  {
    id: "5a56640252d6acddd183d319",
    txt: "Design toDo list",
    isComplete: false,
    createdAt:1658058949000,
    date: 1658058949000
  }
];

function sort(arr) {
  return arr.sort((a, b) => a.createdAt - b.createdAt)
}

function query(filterBy = null) {
  return new Promise((resolve, reject) => {
    let toDosToReturn = storageService.load(STORAGE_KEY) || toDos;
    if (!storageService.load(STORAGE_KEY)) storageService.store(STORAGE_KEY, toDosToReturn)
    if (filterBy && filterBy.term) {
      toDosToReturn = filter(filterBy.term)
    }
    resolve(sort(toDosToReturn))
  })
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const toDo = toDos.find(toDo => toDo.id === id)
    toDo ? resolve(toDo) : reject(`ToDo id ${id} not found!`)
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const index = toDos.findIndex(toDo => toDo.id === id)
    if (index !== -1) {
      toDos.splice(index, 1)
    }
    storageService.store(STORAGE_KEY, toDos);
    resolve(toDos)
  })
}

function _update(toDo) {
  return new Promise((resolve, reject) => {
    const index = toDos.findIndex(c => toDo.id === c.id)
    if (index !== -1) {
      toDos[index] = toDo
    }
    storageService.store(STORAGE_KEY, toDos)
    resolve(toDo)
  })
}

function _add(toDo) {
  return new Promise((resolve, reject) => {
    toDo.id = _makeId()
    toDos.push(toDo)
    storageService.store(STORAGE_KEY, toDos)
    resolve(toDo)
  })
}

function save(toDo) {
  return toDo.id ? _update(toDo) : _add(toDo)
}

function getEmptyToDo() {
  return {
    txt: '',
    isComplete: false,
    createdAt: Date.now(),
    date: new Date()
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