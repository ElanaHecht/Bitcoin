import { ToDoPreview } from "./ToDoPreview";

export function ToDoList({ toDos  }) {
   return (
      <section className="todo-list simple-cards-grid">
               {toDos.map(toDo =>
                  <ToDoPreview key={toDo.id} toDo={toDo} />
               )}
      </section>
   )
}