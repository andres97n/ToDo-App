import { Component, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CheckboxChangeEvent } from 'primeng/checkbox';

import { TodoGroup, MenuValues, Todo } from '../../interfaces';

import { TodoService } from '../../services/todo.service';

import { 
  getTodoGroupCompleted, 
  isTodoGroupComplete, 
  getTodoGroupToDone, 
  getCurrentDate, 
  getNewTodo} from '../../helpers';


@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit{

  private _fb = inject( FormBuilder );
  private _todoService = inject( TodoService );
  private _messageService = inject( MessageService );
  
  @Input()
  public todoGroup!: TodoGroup;
  
  @Input()
  public todoType!: MenuValues;

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

  getTodoPriority( index: number ): number  {
    return this.todoGroup.todos[index].priority!;
  }

  getFormControlName( index: number ): string {
    return `${this.todoGroup.id}_${index + 1}`;
  }

  getTodoFieldValueByIndex( index: number ): string {
    return this.todoGroup.todos[index].task;
  }
  
  setStateChecks(): void {
    if ( this.todoGroup ) {
      this.todoGroup.todos.forEach( todo => {
        this.todoItemsFormArray.push( this._fb.control( todo.taskDone ) );
      });
    }
  }

  isTodoType(): boolean {
    return this.todoType === MenuValues.todo;
  }

  showMessage( severity: string, summary: string, detail: string ): void {
    this._messageService.add({ severity, summary, detail });
  }

  changeVisibleNewInput( state: boolean ): void {
    this.newInputVisible = state;
    return;
  }

  onCheckChange( event: CheckboxChangeEvent, index: number ): void {
    const { checked } = event;
    const todoItems = this.todoItemsFormArray.value;
    const todoGroupId: number = this.todoGroup.id;
    
    if ( isTodoGroupComplete( todoItems ) ) {
      this._todoService.updateTodoGroup( 
        todoGroupId, 
        getTodoGroupCompleted( this.todoGroup ) 
      );
      return;
    }

    this._todoService.updateTodoGroup( 
      todoGroupId, 
      getTodoGroupToDone( this.todoGroup, index, checked ) 
    );    
    return;
  }

  onDoneTodos(): void {
    const todoChecks = this.todoItemsFormArray.value;
    todoChecks.map( 
      (todoCheck: boolean, i: number) => this.todoItemsFormArray.at(i).patchValue(true) 
    );
    this._todoService.updateTodoGroup( 
      this.todoGroup.id, 
      getTodoGroupCompleted( this.todoGroup ) 
    );
    this.showMessage( 'success', '', 'Tareas Terminadas' );
  }

  onSubmitNewTodoItem( task: string ): void {
    const newTodoItem: Todo = getNewTodo( task );

    this.todoItemsFormArray.push( this._fb.control( false ) );
    this._todoService.setTodoToGroup( this.todoGroup.id, newTodoItem );
    this.showMessage( 'success', '', 'Guardado con éxito' );
  }

}
