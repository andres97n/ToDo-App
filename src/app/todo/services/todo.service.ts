import { Injectable, signal } from '@angular/core';

import * as todoList from '../../../assets/data/todos.json';

import { Todo, TodoGroup } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private isLoading = signal<boolean>(false);
  private todos: TodoGroup[] = todoList as TodoGroup[];
  private _emptyTodo: Todo = {
    id: 0,
    task: '',
    start_date: new Date(),
  };

  get todoGroupList(): TodoGroup[]  {
    return { ...this.todos };
  }

  get emptyTodo(): Todo {
    return { ...this._emptyTodo };
  }

}
