import { Component, OnInit } from "@angular/core";
import { TODO } from "../todo.model";
import { TODO_DATA } from "./todos.data";

@Component({
  selector: "app-todo-db",
  styleUrls: ['./todo-db.component.css'],
  templateUrl: './todo-db.component.html',
})
export class TodoDataBindingComponent implements OnInit {
  // Set the todos data and create a copy.
  todos: TODO[] | undefined;
  constructor() { }

  ngOnInit(): void {
    // Initialize the lists of Todos.
    this.todos = TODO_DATA.slice();
  }

  // This function is triggered when a deleteTodo event is fired on the child component
  onTodoDelete(event: TODO) {
    // Ask for a confirmation
    const confirmation = confirm('Are you sure want to delete ' + event.text)
    if (confirmation)
      this.todos!.splice(this.todos!.indexOf(event), 1);
  }

  // This function is triggered when a updateTodo event is fired on the child component
  onTodoUpdated(event: TODO) {
    const todoIndex = this.todos!.indexOf(event);
    this.todos![todoIndex] = event;
  }
}
