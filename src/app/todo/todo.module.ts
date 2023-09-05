import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';

import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';


@NgModule({
  declarations: [
    TodoLayoutComponent,
    TodoPageComponent,
    TodoListPageComponent,
    FooterComponent,
    HeaderComponent,
    TodoCardComponent
  ],
  imports: [
    CommonModule,

    TodoRoutingModule,
    PrimengModule,
  ]
})
export class TodoModule { }
