import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';

import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoNewComponent } from './components/todo-new/todo-new.component';
import { TodoRealizedComponent } from './components/todo-realized/todo-realized.component';


@NgModule({
  declarations: [
    TodoLayoutComponent,
    TodoPageComponent,
    TodoListPageComponent,
    FooterComponent,
    HeaderComponent,
    TodoCardComponent,
    TodoNewComponent,
    TodoRealizedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TodoRoutingModule,
    PrimengModule,
  ]
})
export class TodoModule { }
