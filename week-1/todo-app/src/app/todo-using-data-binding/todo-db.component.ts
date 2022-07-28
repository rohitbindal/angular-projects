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
  // Variable to store the original copy of array, used as a backup for filters.
  todosOriginal: TODO[] | undefined;

  constructor() { }

  ngOnInit(): void {
    // Initialize the lists of Todos.
    this.todos = TODO_DATA.slice();
    this.todosOriginal = this.todos.slice();
  }

  // This function is triggered when a deleteTodo event is fired on the child component
  onTodoDelete(event: TODO) {
    // Ask for a confirmation
    const confirmation = confirm('Are you sure want to delete ' + event.text)
    if (confirmation) {
      this.todosOriginal!.splice(this.todos!.indexOf(event), 1);
      this.todos = this.todosOriginal;
    }
  }

  // This function is triggered when a updateTodo event is fired on the child component
  onTodoUpdated(event: TODO) {
    this.todosOriginal?.splice(this.todos!.indexOf(event), 1, event);
    this.todos = this.todosOriginal;
  }

  // Function to filter the todos based on status
  onFilterClicked(filter: string) {
    // Reset the todos list
    this.todos = this.todosOriginal;
    // To view all the todos, return after resetting the todos list
    if (filter === 'ALL') {
      return;
    }
    // Filter out the todos based on status
    this.todos = this.todosOriginal?.filter(todo => {
      return todo.status === filter
    })
  }
}
