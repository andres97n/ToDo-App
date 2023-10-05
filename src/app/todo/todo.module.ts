import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { MessageService } from 'primeng/api';

import { TodoService } from './services/todo.service';

import { TodoLayoutComponent } from './layouts/todo-layout/todo-layout.component';

import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoItemsComponent } from './components/todo-items/todo-items.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoItemDetailComponent } from './components/todo-item-detail/todo-item-detail.component';

import { NewValueDialogComponent } from '../shared/components/new-value-dialog/new-value-dialog.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TodoCardComponent,
    TodoItemComponent,
    TodoItemDetailComponent,
    TodoItemsComponent,
    TodoLayoutComponent,
    TodoListPageComponent,
    TodoPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TodoRoutingModule,
    PrimengModule,

    NewValueDialogComponent,
  ],
  providers: [
    MessageService,
    TodoService,
  ],
})
export class TodoModule { }
