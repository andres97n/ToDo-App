import { Injectable, computed, signal } from '@angular/core';

import * as todos from '../../../assets/data/todos.json';

import { Todo, TodoGroup } from '../interfaces';
import { emptyTodoGroup } from '../helpers';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todoListRaw: any = todos;
  private _todoGroups = signal<TodoGroup[]>([]);  
  private isLoading = signal<boolean>(false);

  public todoGroups = computed( () => this._todoGroups() );

  constructor() { 
    if ( this._todoListRaw.default ) {
      this._todoGroups.update( () => this._todoListRaw.default ); 
    }
  }

  // get emptyTodo(): Todo {
  //   return { ...this._emptyTodo };
  // }

  public setTodoGroup(todos: TodoGroup): void {
    this._todoGroups.update( currentGroups => [ todos, ...currentGroups ] );
    return;
  }

  public setTodoToGroup(id: number, todo: Todo): void {
    const group = this.todoGroups().find(group => group.id === id);
    if (group) {
      group.todos = [ todo, ...group.todos ];
      this._todoGroups().map( 
        currentGroup => currentGroup.id === id 
          ? group 
          : currentGroup 
      );
    }
    return;
  }

  public getTodoGroupById(id: number): TodoGroup {
    return this.todoGroups().find(todo => todo.id === id) || emptyTodoGroup;
  }

}
