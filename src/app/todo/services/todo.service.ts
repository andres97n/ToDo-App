import { Injectable, signal } from '@angular/core';

import * as todoList from '../../../assets/data/todos.json';

import { TodoGroup } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private isLoading = signal<boolean>(false);
  private todos: TodoGroup[] = todoList as TodoGroup[];

  get todoGroupList(): TodoGroup[]  {
    return { ...this.todos };
  }

}
