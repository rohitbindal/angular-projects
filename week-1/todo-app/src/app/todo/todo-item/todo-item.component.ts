import { Component, Input, OnInit } from '@angular/core';
import { TODO } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todoItem!: TODO;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

}
