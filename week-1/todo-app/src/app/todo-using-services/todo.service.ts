import { STATUS, TODO } from "./todo.model";

export class TodoService {
  private todos: TODO[] = [
    new TODO('This is todo 1', '27 July', STATUS.PENDING, 1),
    new TODO('This is todo 2', '22 July', STATUS.COMPLETED, 2),
    new TODO('This is todo 3', '26 July', STATUS.INPROGRESS, 3),
  ]

  getTodos() {
    return this.todos;
  }
}
