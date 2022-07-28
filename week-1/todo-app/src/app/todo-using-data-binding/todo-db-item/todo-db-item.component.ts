import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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

  // Creating CUstom events to manage the todo deletion and update operations
  @Output() updateTodo = new EventEmitter<TODO>();
  @Output() deleteTodo = new EventEmitter<TODO>();

  todoStatus = 'pending';
  // An array to store different status to be used in a <select> element.
  statusOptions: [string, string, string] = ['pending', 'inprogress', 'completed'];
  // Set the default selector as 'pending'
  statusSelected: string = this.statusOptions[0];
  // Activate Edit mode
  isEditable = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize the todoStatus
    this.todoStatus = this.todo.status.toLowerCase();
  }

  onEditClicked() {
    // If there is a change update the todo list.
    if (this.isEditable) {
      // Emit an updateTodo event to notify the parent component that a todo has been updated/edited.
      this.updateTodo.emit(this.todo);
    }
    this.isEditable = !this.isEditable;
  }

  onDeleteClicked() {
    // Emit a deleteTodo event to notify the parent component that a todo has been deleted.
    this.deleteTodo.emit(this.todo);
  }
}
