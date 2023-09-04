import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';

import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';


const routes: Routes = [
  {
    path: '',
    component: TodoLayoutComponent,    
    children: [
      { path: 'todo-list', component: TodoListPageComponent },
      { path: 'todo/:id', component: TodoPageComponent },
      { path: '**', redirectTo: 'todo-list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
