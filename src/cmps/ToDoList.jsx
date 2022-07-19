import { ToDoPreview } from "./ToDoPreview";

export function ToDoList({ toDos, onRemoveToDo, onCompleteToDo }) {
   return (
      <section className="todo-list">
               {toDos.map(toDo =>
                  <ToDoPreview onRemoveToDo={onRemoveToDo}  onCompleteToDo={onCompleteToDo} key={toDo.id} toDo={toDo} />
               )}
      </section>
   )
}