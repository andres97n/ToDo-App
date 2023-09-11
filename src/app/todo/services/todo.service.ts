import { Injectable, computed, signal } from '@angular/core';

import * as todos from '../../../assets/data/todos.json';

import { Todo, TodoGroup } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todoListRaw: any = todos;
  private _todoGroups = signal<TodoGroup[]>([]);  
  private isLoading = signal<boolean>(false);
  
  private _emptyTodo: Todo = {
    id: 0,
    task: '',
    start_date: new Date(),
  };

  public todoGroups = computed( () => this._todoGroups() );

  constructor() { 
    if ( this._todoListRaw.default ) {
      this._todoGroups.update( () => this._todoListRaw.default ); 
    }
  }

  // get todoGroupList(): TodoGroup[]  {
  //   console.log(this.todoGroups(), 'holas');
  //   return { ...this.todoGroups() };
  // }

  get emptyTodo(): Todo {
    return { ...this._emptyTodo };
  }

  setTodoGroup(todos: TodoGroup): void {
    this._todoGroups.update( currentGroups => [ todos, ...currentGroups ] );
    return;
  }

  setTodoToGroup(id: number, todo: Todo): void {
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

  public getTodoById(id: number): Todo {
    return this.todoGroups().find(todo => todo.id === id)?.todos[0] || this._emptyTodo;
  }

}
