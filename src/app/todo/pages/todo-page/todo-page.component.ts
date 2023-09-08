import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '../../interfaces';

import { TodoService } from '../../services/todo.service';


@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit{

  private _route = inject( Router );
  private _todoService = inject( TodoService );

  public todoGroupId = signal<string>('');
  
  get emptyTodo(): Todo {
    return this._todoService.emptyTodo;
  }

  ngOnInit(): void {
    
  }

}
