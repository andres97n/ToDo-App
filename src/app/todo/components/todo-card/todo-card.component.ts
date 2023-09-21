import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, } from '@angular/forms';

import { TodoGroup, MenuValues, Todo } from '../../interfaces';

import { 
  getTodoGroupCompleted, 
  isTodoGroupComplete, 
  getTodoGroupToDone, 
  getCurrentDate } from '../../helpers';


@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit{

  private _fb = inject( FormBuilder );
  
  @Input()
  public todoGroup!: TodoGroup;
  
  @Input()
  public type!: MenuValues;

  @Output()
  public onCheckChangeStatus: EventEmitter<TodoGroup> = new EventEmitter();

  public cardForm: FormGroup = this._fb.group({
    todoItems: this._fb.array([]),
  });

  public newInputVisible: boolean = false;

  ngOnInit(): void {
    this.setStateChecks();
  }

  get todoItemsFormArray(): FormArray {
    return this.cardForm.get('todoItems') as FormArray;
  }
  
  setStateChecks(): void {
    if ( this.todoGroup ) {
      this.todoGroup.todos.forEach( todo => {
        this.todoItemsFormArray.push( this._fb.control( todo.taskDone ) );
      });
    }
  }

  onCheckChange(): void {
    const todoItems = this.todoItemsFormArray.value;

    if ( isTodoGroupComplete( todoItems ) ) {
      this.onCheckChangeStatus.emit( getTodoGroupCompleted( this.todoGroup ) );
      return;
    }

    if ( this.type === MenuValues.done ) {
      this.onCheckChangeStatus.emit( 
        getTodoGroupToDone( this.todoGroup, this.todoItemsFormArray.value ) 
      );
      return;
    }
  }

  isTodoType(): boolean {
    return this.type === MenuValues.todo;
  }

  getFormControlName( index: number ): string {
    return `${this.todoGroup.id}_${index + 1}`;
  }

  getTodoFieldValueByIndex( index: number ): string {
    return this.todoGroup.todos[index].task;
  }

  changeVisibleNewInput( state: boolean ): void {
    this.newInputVisible = state;
    return;
  }

  onDoneTodos(): void {
    const todoChecks = this.todoItemsFormArray.value;
    todoChecks.map( 
      (todoCheck: boolean, i: number) => this.todoItemsFormArray.at(i).patchValue(true) 
    );
    this.onCheckChangeStatus.emit( 
      getTodoGroupCompleted( this.todoGroup ) 
    );
  }

  onSubmitNewTodoItem( todo: string ): void {
    const newTodoItem: Todo = { 
      id: Number(Math.floor(Math.random() * 100000).toString()),
      start_date: getCurrentDate(),
      task: todo, 
      taskDone: false, 
    };

    this.todoItemsFormArray.push( this._fb.control( false ) );
    this.todoGroup.todos = [ ...this.todoGroup.todos, newTodoItem ];

    if ( this.type === MenuValues.done ) {
      this.onCheckChangeStatus.emit( 
        getTodoGroupToDone( this.todoGroup, this.todoItemsFormArray.value ) 
      );
    } 
  }

}
