import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';


@NgModule({
  declarations: [
    TodoLayoutComponent,
    TodoPageComponent,
    TodoListPageComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
