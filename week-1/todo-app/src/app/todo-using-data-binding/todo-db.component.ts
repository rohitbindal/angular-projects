import { Component } from "@angular/core";
import { TODO } from "../todo.model";
import { TODO_DATA } from "./todos.data";

@Component({
  selector: "app-todo-db",
  styleUrls: ['./todo-db.component.css'],
  templateUrl: './todo-db.component.html',
})
export class TodoDataBindingComponent {
  // Set the todos data and create a copy.
  todos: TODO[] | undefined = TODO_DATA.slice();

}
