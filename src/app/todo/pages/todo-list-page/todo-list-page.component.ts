import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs'

import { MenuToggle, MenuValues, TodoGroup } from '../../interfaces/';

import { TodoService } from '../../services/todo.service';
import { todoStateOptions } from '../../helpers';


@Component({
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit{

  private _todoService = inject( TodoService );
  private _router = inject( Router );

  private _todoGroupsList = signal<TodoGroup[]>([]);

  public visible: boolean = false;
  public todoGroupsList = computed( () => this._todoGroupsList() );


  public titleInput = new FormControl('');
  public toggleButton = new FormControl('todo');

  get stateOptions(): MenuToggle[] {
    return todoStateOptions;
  }

  get toggleValue(): MenuValues {
    return this.toggleButton.value as MenuValues;
  } 

  ngOnInit(): void {
    this._todoGroupsList.update( () => this._todoService.todoGroupList );
    
  }

  isTodoListEmpty(): boolean {
    return this.todoGroupsList().length === 0;
  }

  isToDoNew(): boolean {
    return this.toggleValue === MenuValues.todo;
  }

  changeVisibleState( state: boolean ): void {
    this.visible = state;
  }

  saveTodoGroup(): void {
    if ( this.titleInput.value === '' ) return; 

    const todoGroupId: number = Number(Math.floor(Math.random() * 100000).toString());
    const newTodoGroup: TodoGroup = {
      id: todoGroupId,
      title: this.titleInput.value!,
      start_date: dayjs().format('DD/MM/YYYY'),
      completed: false,
      todos: [],
    }
    this._todoService.setTodoGroup( newTodoGroup );
    this.titleInput.setValue('');
    this.changeVisibleState(false);
    this._router.navigateByUrl(`/dashboard/todo/${todoGroupId}`);
    return;
  }

}
