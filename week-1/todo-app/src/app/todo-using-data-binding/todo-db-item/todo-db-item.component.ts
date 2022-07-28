import { Component, Input, OnInit } from "@angular/core";
import { TODO } from "src/app/todo.model";

@Component({
  selector: "app-todo-db-item",
  styleUrls: ['./todo-db-item.component.css'],
  templateUrl: './todo-db-item.component.html',
})
export class TodoDataBindingItemComponent implements OnInit {
  /**
  * Get the todo passed from the parent component using @Input decorator.
  * Since we are checking for empty todo beforehand, it can be said that the
  * 'todo' will not be undefined.
  */
  @Input() todo!: TODO;
  todoStatus = 'pending';
  // An array to store different status to be used in a <select> element.
  statusOptions: [string, string, string] = ['pending', 'inprogress', 'completed'];
  // Set the default selector as 'pending'
  statusSelected: string = this.statusOptions[0];
  constructor() { }
  ngOnInit(): void {
    this.todoStatus = this.todo.status.toLowerCase();
  }
}
