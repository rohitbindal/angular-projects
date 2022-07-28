import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo-using-services/todo.component';
import { TodoItemComponent } from './todo-using-services/todo-item/todo-item.component';
import { TodoDataBindingComponent } from './todo-using-data-binding/todo-db.component';
import { TodoDataBindingItemComponent } from './todo-using-data-binding/todo-db-item/todo-db-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // Components that use Services and data binding
    TodoComponent,
    TodoItemComponent,
    // Component that use data binding only
    TodoDataBindingComponent,
    TodoDataBindingItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
