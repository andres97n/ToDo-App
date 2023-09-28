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
  // private isLoading = signal<boolean>(false);

  public todoGroups = computed( () => this._todoGroups() );

  constructor() { 
    if ( this._todoListRaw.default ) {
      this._todoGroups.update( () => this._todoListRaw.default ); 
    }
  }

  public setTodoGroup(todos: TodoGroup): void {
    this._todoGroups.update( currentGroups => [ ...currentGroups, todos ] );
    return;
  }

  public setTodoToGroup(todoGroupId: number, todo: Todo): void {
    const group = this.todoGroups().find(group => group.id === todoGroupId);
    if (group) {
      group.todos = [ ...group.todos, todo ];
      this._todoGroups().map( 
        currentGroup => currentGroup.id === todoGroupId
          ? group 
          : currentGroup 
      );
    }
    return;
  }

  public updateTodoGroup(id: number, todoGroup: TodoGroup): void {
    this._todoGroups.update( todoGroups => {
      return todoGroups.map( currentGroup => {
        if (currentGroup.id === id) return todoGroup; 
        
        return currentGroup;
      });
    });
  }

  public updateTodoToGroup(todoGroupId: number, todoId: number, todo: Todo): void {
    this._todoGroups.update( todoGroups => {
      return todoGroups.map( currentGroup => {
        if (currentGroup.id === todoGroupId) {
          currentGroup.todos = currentGroup.todos.map( currentTodo => {
            if (currentTodo.id === todoId) return todo;
            
            return currentTodo;
          });
        }
        return currentGroup;
      })
    
    });
  }

  public getTodoGroupById(id: number): TodoGroup {
    return this.todoGroups().find(todo => todo.id === id) || emptyTodoGroup;
  }

  public deleteTodoOfAGroup(todoGroupId: number, todoId: number): void {
    this._todoGroups.update( currentGroups => (
      currentGroups.map( currentGroup => {
        if (currentGroup.id === todoGroupId) {
          currentGroup.todos = currentGroup.todos.filter( currentTodo => {
            return currentTodo.id !== todoId;
          });
        }
        return currentGroup;
      })
    ));
  }


  
    

}
