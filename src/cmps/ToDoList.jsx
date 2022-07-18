import { ToDoPreview } from "./ToDoPreview";

export function ToDoList({ toDos, onRemoveToDo }) {
   return (
      <section className="todo-list simple-cards-grid">
               {toDos.map(toDo =>
                  <ToDoPreview onRemoveToDo={onRemoveToDo} key={toDo.id} toDo={toDo} />
               )}
      </section>
   )
}