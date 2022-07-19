import { storageService } from "./storageService";
export const toDoService = {
  query,
  getById,
  remove,
  save,
  getEmptyToDo
}


const STORAGE_KEY = 'toDoDB'
const gDefaultToDos = [
  {
    id: "5a5664025f",
    txt: "Learn about toDo lists",
    isComplete: false,
    createdAt: 1658058949000,
    date: '2022-07-16'
  },
  {
    id: "5a5664026f",
    txt: "Create toDo list",
    isComplete: false,
    createdAt: 1658058949000,
    date: '2022-07-17'
  },
  {
    id: "5a5664027f",
    txt: "Design toDo list",
    isComplete: false,
    createdAt: 1658058949000,
    date: '2022-07-26'
  }
];

const gToDos = _loadToDos()

function query(filterBy) {
  return new Promise((resolve, reject) => {
    let toDosToReturn = gToDos;
    if (!storageService.load(STORAGE_KEY)) storageService.store(STORAGE_KEY, toDosToReturn)
    if (filterBy) {
      toDosToReturn = _filter(filterBy)
    }
    resolve(toDosToReturn)
  })
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const toDo = gToDos.find(toDo => toDo.id === id)
    toDo ? resolve(toDo) : reject(`ToDo id ${id} not found!`)
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const index = gToDos.findIndex(toDo => toDo.id === id)
    if (index !== -1) {
      gToDos.splice(index, 1)
    }
    storageService.store(STORAGE_KEY, gToDos);
    resolve(gToDos)
  })
}

function _update(toDo) {
  return new Promise((resolve, reject) => {
    const index = gToDos.findIndex(c => toDo.id === c.id)
    if (index !== -1) {
      gToDos[index] = toDo
    }
    storageService.store(STORAGE_KEY, gToDos)
    resolve(toDo)
  })
}

function _add(toDo) {
  return new Promise((resolve, reject) => {
    toDo.id = _makeId()
    gToDos.push(toDo)
    storageService.store(STORAGE_KEY, gToDos)
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

function _loadToDos() {
  let toDos = storageService.load(STORAGE_KEY)
  if (!toDos || !toDos.length) toDos = gDefaultToDos
  storageService.store(STORAGE_KEY, toDos)
  return toDos
}

function _filter(filterBy) {
  let currToDos = [...gToDos]
  if (filterBy.status) {
    switch (filterBy.status) {
      case 'active':
        currToDos = gToDos.filter(toDo => !toDo.isComplete);
        break;
      case 'complete':
        currToDos = gToDos.filter(toDo => toDo.isComplete);
        break;
      default:
        currToDos = gToDos;
    }
    return currToDos
  }
  if (filterBy.term) {
    filterBy.term = filterBy.term.toLocaleLowerCase()
    return currToDos.filter(toDo => {
      return toDo.txt.toLocaleLowerCase().includes(filterBy.term)
    })
  }else {
    return currToDos
  }
  // if (filterBy.sort) {
  //   return _sort(gToDos, filterBy.sort)
  // }
}

function _sort(arr, sortBy) {
  switch (sortBy) {
    case 'Title':
      return arr.sort((a, b) => a.txt.localeCompare(b.txt))
    case 'DueDate':
      return arr.sort((a, b) => a.date - b.date)
    case 'Created':
      return arr.sort((a, b) => a.createdAt - b.createdAt)
    default:
      return arr.sort((a, b) => a.createdAt - b.createdAt)
  }
}



function _makeId(length = 10) {
  let txt = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}