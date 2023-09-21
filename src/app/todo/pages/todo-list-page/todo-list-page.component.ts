import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs';

import { MenuToggle, MenuValues, TodoGroup } from '../../interfaces/';

import { todoStateOptions } from '../../helpers';

import { TodoService } from '../../services/todo.service';


@Component({
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent {

  private _todoService = inject( TodoService );
  private _router = inject( Router );

  public dialogVisible: boolean = false;

  public toggleButton = new FormControl('todo');

  get todoGroupsList(): TodoGroup[] {
    return this._todoService.todoGroups();
  }

  get stateOptions(): MenuToggle[] {
    return todoStateOptions;
  }

  get toggleValue(): MenuValues {
    return this.toggleButton.value as MenuValues;
  }

  changeDialogVisibility( state: boolean ): void {
    this.dialogVisible = state;
  }

  saveTodoGroup( title: string ): void {
    const todoGroupId: number = Number(Math.floor(Math.random() * 100000).toString());
    const newTodoGroup: TodoGroup = {
      id: todoGroupId,
      title: title,
      start_date: dayjs().format('DD/MM/YYYY'),
      completed: false,
      todos: [],
    }

    this._todoService.setTodoGroup( newTodoGroup );
    this._router.navigateByUrl(`/dashboard/todo/${todoGroupId}`);
    return;
  }

}
